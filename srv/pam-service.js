// Imports
const cds = require("@sap/cds");
const schedule = require("node-schedule");
const https = require('https');
const date = require('silly-datetime');

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

    this.on("READ", PurchaseRequisitionItems, async (req) => {
        // getMails();
        // sendMail();
        // updateMail('AQMkADAwATM0MDAAMS00ODkwLTk2YzktMDACLTAwCgBGAAADRhD4NPFCOkGa5OLjSN_QtwcABkfSyFcE9UmKllR9a79jigAAAgEMAAAABkfSyFcE9UmKllR9a79jigAAABVZ1WAAAAA=');

    });

    function scheduleJob() {

        // 定义规则
        let rule = new schedule.RecurrenceRule();
        // rule.date = [1];
        // rule.dayOfWeek = [1, 3, 5];
        // rule.hour = [0, 12]; 
        rule.minute = [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 30, 33, 35, 37, 40, 43, 45, 46, 47, 48, 49, 50, 55];
        // rule.second = 0;

        var index = 0;
        // start job
        let job = schedule.scheduleJob(rule, () => {
            index = index + 1;
            console.log("---------------------" + index);
            console.log(new Date());
            console.log("---------------------");

            insertRemoteServiceData(index);
            sendMail();

            if (index == 3) {
                job.cancel();
            }
        });


    }

    // scheduleJob();

    async function insertRemoteServiceData(index) {
        var prs = await BPsrv.send({
            query: SELECT.from(PurchaseRequisitions).where("ReleaseCode='' or ReleaseCode='A'").orderBy("PurchaseRequisition").limit(2, (index - 1) * 2),
            headers: {
                apikey: process.env.apikey,
            },
        });

        if (prs) {
            await cds.run(INSERT.into(PurchaseRequisitionItems, prs));
        }
    }

    async function getMailContent() {
        var query = SELECT.from(PurchaseRequisitionItems).columns('PurchaseRequisition', 'PurchasingDocument', 'PurchaseRequisitionItemText', 'Material', 'RequestedQuantity', 'PurchaseRequisitionPrice', 'CompanyCode', 'Supplier', 'CreationDate', 'DeliveryDate').where("ReleaseCode='' or ReleaseCode='A'").orderBy("PurchaseRequisition");

        var prs = await cds.run(query);

        var html = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title></title></head><body><div id=\"prsdiv\" style=\"font-size:11pt\">";

        if (prs) {
            prs.forEach(function (element) {
                html = html + formatPurchaseRequisitionStr(element);
            });

        }

        html = html + "</div></body></html>";
        return html;

    }

    async function formatPurchaseRequisitionStr(item) {
        
        var purchaseRequisition = item.PurchaseRequisition;
        var purchasingDocument = item.PurchasingDocument;
        var text = item.PurchaseRequisitionItemText;
        var material = item.Material;
        var requestedQuantity = item.RequestedQuantity;
        var price = item.PurchaseRequisitionPrice;
        var companyCode = item.CompanyCode;
        var supplier = item.Supplier;
        var creationDate = item.CreationDate;
        var deliveryDate = item.DeliveryDate;

        var result = "<div>Purchase Requisition Id:<span name=\"prId\">"+purchaseRequisition
        +"</span></div><div>Purchase Order Id:<span>"+purchasingDocument
        +"</span></div><div>Short Text:<span>"+text
        +"</span></div><div>Material:<span>"+material
        +"</span></div><div>Quantity requested:<span>"+requestedQuantity
        +"</span></div><div>Valuation Price:<span>"+price
        +"</span></div><div>Company Code:<span>"+companyCode
        +"</span></div><div>Desired Supplier:<span>"+supplier
        +"</span></div><div>Requisition Date:<span>"+creationDate
        +"</span></div><div>Delivery Date:<span>"+deliveryDate
        +"</span></div><div>--------------------------------------------------------------</div>";
        
        return result;
    }

    async function getMails() {
        const options = {
            hostname: 'api.openconnectors.trial.us10.ext.hana.ondemand.com',
            port: 443,
            path: "/elements/api-v2/messages?where=IsRead%3D'false'",
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'User +/pss2/sKW+/gylfU9uJT6z2RS7OZX5D2If4ybRKRD0=, Organization 1e433c34db6484da4a5d4963357ccc35, Element 1kqtR353PM6PY1oXm/dyLsvihhq7sfvPo1sLMiqI1U0='
            }

        };

        const req = https.request(options, (res) => {
            console.log('GET-->statusCode:', res.statusCode);
            // console.log('GET-->headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });
        req.end();
    }

    async function sendMail() {
        var currentDate = date.format(new Date(), 'YYYYMMDD');

        var post_data = {
            "Body": {
                "Content": getMailContent(),
                "ContentType": "HTML"
            },
            "From": {
                "EmailAddress": {
                    "Address": "btppam@outlook.com",
                    "Name": "PAM Service"
                }
            },
            "Importance": "High",
            "InferenceClassification": "Focused",
            "IsDeliveryReceiptRequested": false,
            "IsRead": false,
            "IsReadReceiptRequested": false,
            "Sender": {
                "EmailAddress": {
                    "Address": "btppam@outlook.com",
                    "Name": "PAM Service"
                }
            },
            "Subject": "Purchase approval application "+currentDate,
            "ToRecipients": [
                {
                    "EmailAddress": {
                        "Address": "jingzhe.ye@outlook.com",
                        "Name": "Jingzhe Ye"
                    }
                }
            ]
        };

        var content = JSON.stringify(post_data);

        const options = {
            hostname: 'api.openconnectors.trial.us10.ext.hana.ondemand.com',
            port: 443,
            path: '/elements/api-v2/messages',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': 'User +/pss2/sKW+/gylfU9uJT6z2RS7OZX5D2If4ybRKRD0=, Organization 1e433c34db6484da4a5d4963357ccc35, Element 1kqtR353PM6PY1oXm/dyLsvihhq7sfvPo1sLMiqI1U0=',
                'Content-Type': 'application/json'
            }

        };

        const req = https.request(options, (res) => {
            console.log('POST-->statusCode:', res.statusCode);
            // console.log('POST-->headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        // write data to request body  
        req.write(content);

        req.end();
    }

    async function updateMail(mailId) {

        var patch_data = {
            "IsRead": true
        };

        var content = JSON.stringify(patch_data);

        const options = {
            hostname: 'api.openconnectors.trial.us10.ext.hana.ondemand.com',
            port: 443,
            path: '/elements/api-v2/messages/' + mailId,
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Authorization': 'User +/pss2/sKW+/gylfU9uJT6z2RS7OZX5D2If4ybRKRD0=, Organization 1e433c34db6484da4a5d4963357ccc35, Element 1kqtR353PM6PY1oXm/dyLsvihhq7sfvPo1sLMiqI1U0=',
                'Content-Type': 'application/json'
            }

        };

        const req = https.request(options, (res) => {
            console.log('PATCH-->statusCode:', res.statusCode);
            // console.log('PATCH-->headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        // write data to request body  
        req.write(content);

        req.end();
    }

});




