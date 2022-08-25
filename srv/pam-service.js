// Imports
const cds = require("@sap/cds");
const schedule = require("node-schedule");

/**
 * The service implementation with all service handlers
 */
module.exports = cds.service.impl(async function () {
    // Define constants for the PurchaseRequisitionItems entities from the pam-service.cds file
    const { PurchaseRequisitionItems, PurchaseRequisitions } = this.entities;

    // connect to remote service
    const BPsrv = await cds.connect.to("API_PURCHASEREQ_PROCESS_SRV");

    /**
     * Event-handler for read-events on the PurchaseRequisitions entity.
     * Each request to the API Business Hub requires the apikey in the header.
     */
    this.on("READ", PurchaseRequisitions, async (req) => {

        // const prs = await BPsrv.transaction(req).send({
        //     query: SELECT.from(this.entities.PurchaseRequisitions).where("PurchaseRequisition='10000010'").orderBy("PurchaseRequisition"),
        //     headers: {
        //         apikey: process.env.apikey,
        //     },
        // });

        const prs = await BPsrv.send({
            query: SELECT.from(this.entities.PurchaseRequisitions).where("PurchaseRequisition='10000010'").orderBy("PurchaseRequisition"),
            headers: {
                apikey: process.env.apikey,
            },
        });
        return prs;
    });

    // this.before("READ", PurchaseRequisitionItems, async (req) => {

    //     const prs = await BPsrv.send({
    //         query: SELECT.from(this.entities.PurchaseRequisitions).orderBy("PurchaseRequisition").limit(1, 10),
    //         headers: {
    //             apikey: process.env.apikey,
    //         },
    //     });

    //     // console.log("-----------------res start----------------");
    //     // console.log(prs);
    //     // console.log("-----------------res end----------------");

    //     // const tx = cds.tx(req);
    //     await cds.run(INSERT.into(PurchaseRequisitionItems, prs));

    //     // srv.run(INSERT.into(PurchaseRequisitionItems, prs));

    // });

    function scheduleJob(){
    
        // 定义规则
        let rule = new schedule.RecurrenceRule();
        // rule.date = [1];//每月1号
        // rule.dayOfWeek = [1, 3, 5];//每周一、周三、周五
        // rule.hour = [0, 12]; // 每天0点和12点开始推送
        rule.minute = [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 30, 33, 35, 37, 40, 43, 45, 46, 47, 48, 49, 50, 55]; // 每隔 5 分钟执行一次
        // rule.second = 0;//每分钟的0秒执行
    
        var index = 0;
        // 启动任务
        // let job = schedule.scheduleJob(rule, () => {
        //     index = index + 1;
        //     console.log("---------------------" + index);
        //     console.log(new Date());
        //     console.log("---------------------");
    
        //     insertRemoteServiceData(index);
    
        //     if(index == 3){
        //         job.cancel();
        //     }
        // });


    }

    async function insertRemoteServiceData(index){
        var prs = await BPsrv.send({
            query: SELECT.from(PurchaseRequisitions).where("ReleaseCode='' or ReleaseCode='A'").orderBy("PurchaseRequisition").limit(1, index-1),
            headers: {
                apikey: process.env.apikey,
            },
        });

        if(prs){
            await cds.run(INSERT.into(PurchaseRequisitionItems, prs));
        }
    }

    scheduleJob();

});