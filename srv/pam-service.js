// Imports
const cds = require("@sap/cds");
const schedule = require("node-schedule");
const https = require('https');
const date = require('silly-datetime');
const JSDOM = require('jsdom').JSDOM;

/**
 * The service implementation with all service handlers
 */
module.exports = cds.service.impl(async function () {
    // Define constants for the PurchaseRequisitionItems entities from the pam-service.cds file
    const { PurchaseRequisitionItems, PurchaseRequisitions } = this.entities;

    // connect to remote service
    const BPsrv = await cds.connect.to("API_PURCHASEREQ_PROCESS_SRV");

    const db = await cds.connect.to('db');

    /**
     * Event-handler for read-events on the PurchaseRequisitions entity.
     * Each request to the API Business Hub requires the apikey in the header.
     */
    this.on("READ", PurchaseRequisitions, async (req) => {

        const prs = await BPsrv.send({
            query: SELECT.from(this.entities.PurchaseRequisitions).where("PurchaseRequisition='10000010'").orderBy("PurchaseRequisition"),
            headers: {
                apikey: process.env.apikey,
            },
        });
        return prs;
    });

    this.on("READ", PurchaseRequisitionItems, async (req) => {
        getMails();
        // sendMail();
        // updateMail('AQMkADAwATM0MDAAMS00ODkwLTk2YzktMDACLTAwCgBGAAADRhD4NPFCOkGa5OLjSN_QtwcABkfSyFcE9UmKllR9a79jigAAAgEMAAAABkfSyFcE9UmKllR9a79jigAAABVZ1WAAAAA=');

        // updatePurchaseRequisitionItems('10000000', 'B', db.tx());
        // updateRemoteServiceData('10000011', '10', 'B');
    });

    // scheduleJobGetPr();
    // scheduleJobUpdatePr();

    function scheduleJobGetPr() {

        // 定义规则
        let rule = new schedule.RecurrenceRule();
        // rule.date = [1];
        // rule.dayOfWeek = [1, 3, 5];
        // rule.hour = [0, 12]; 
        rule.minute = [1, 5, 7, 9, 11, 13, 15, 20, 22, 24, 30, 35, 40, 45, 47, 49, 50, 55];
        // rule.second = 0;

        var index = 0;
        // start job
        let job = schedule.scheduleJob(rule, () => {
            index = index + 1;
            console.log("scheduleJobGetPr---------------------" + index);
            console.log(new Date());
            console.log("---------------------");

            insertRemoteServiceData(index);
            // sendMail();

            if (index == 4) {
                job.cancel();
            }
        });


    }

    function scheduleJobUpdatePr() {

        // 定义规则
        let rule = new schedule.RecurrenceRule();
        // rule.date = [1];
        // rule.dayOfWeek = [1, 3, 5];
        // rule.hour = [0, 12]; 
        rule.minute = [0, 3, 6, 10, 12, 14, 21, 23, 25, 31, 33, 37, 41, 43, 46, 48, 51, 54];
        // rule.second = 0;

        var index = 0;
        // start job
        let job = schedule.scheduleJob(rule, () => {
            index = index + 1;
            console.log("scheduleJobUpdatePr---------------------" + index);
            console.log(new Date());
            console.log("---------------------");

            getMails();

            if (index == 6) {
                job.cancel();
            }
        });


    }


    async function insertRemoteServiceData(index) {
        var prs = await BPsrv.send({
            query: SELECT.from(PurchaseRequisitions).where("ReleaseCode='' or ReleaseCode='A'").orderBy("PurchaseRequisition").limit(2, (index - 1) * 2),
            headers: {
                apikey: process.env.apikey,
            },
        });

        if (prs) {
            await cds.run(INSERT.into(PurchaseRequisitionItems, prs));
            console.log("INSERT complete");
        }

        sendMail();
    }

    async function updateRemoteServiceData(prId, prItem, releaseCode) {
        let tx = BPsrv.tx();
        try {
            var result = await tx.send({
                query: UPDATE(PurchaseRequisitions).set `ReleaseCode=${releaseCode}` .where `PurchaseRequisition=${prId} and PurchaseRequisitionItem=${prItem}`,
                headers: {
                    apikey: process.env.apikey,
                },
            });

        } catch (error) {
            console.log("error message ==> " + error);
            console.log(error.code);
            console.log("Update Remote Service Data "+prId+", "+prItem+", "+releaseCode);
            // console.log("=======================================");
            // console.log(error);
        }

    }

    async function getMailContent() {
        var query = SELECT.from(PurchaseRequisitionItems).columns('PurchaseRequisition', 'PurchasingDocument', 'PurchaseRequisitionItemText', 'Material', 'RequestedQuantity', 'PurchaseRequisitionPrice', 'CompanyCode', 'Supplier', 'CreationDate', 'DeliveryDate').where("ReleaseCode='' or ReleaseCode='A'").orderBy("PurchaseRequisition");

        var prs = await cds.run(query);

        var html = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title></title></head><body><div id=\"prsdiv\" style=\"font-size:11pt\"><div>Please approve the following purchase requisitions. You can reply to the approval result directly in the email according to the example. If you want to approve all, please reply [approve all] directly. If you want to reject all, please reply [reject all] directly. If you want to approve each purchase requisition separately, please reply in this format (Purchase Requisition Id-result). For example: 10000011-approve, 10000012-reject</div><div>--------------------------------------------------------------</div>";

        if (prs) {
            prs.forEach(function (element) {
                html = html + formatPurchaseRequisitionStr(element);
            });

        }

        html = html + "</div></body></html>";
        console.log(html);
        return html;

    }

    function formatPurchaseRequisitionStr(item) {

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

        var result = "<div>Purchase Requisition Id:" + purchaseRequisition
            + "</div><div>Purchase Order Id:" + purchasingDocument
            + "</div><div>Short Text:" + text
            + "</div><div>Material:" + material
            + "</div><div>Quantity requested:" + requestedQuantity
            + "</div><div>Valuation Price:" + price
            + "</div><div>Company Code:" + companyCode
            + "</div><div>Desired Supplier:" + supplier
            + "</div><div>Requisition Date:" + creationDate
            + "</div><div>Delivery Date:" + deliveryDate
            + "</div><div>--------------------------------------------------------------</div>";

        return result;
    }

    function getMails() {
        const options = {
            hostname: 'api.openconnectors.trial.us10.ext.hana.ondemand.com',
            port: 443,
            path: "/elements/api-v2/messages?where=IsRead%3D'false'",
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': process.env.authorization
            }

        };

        const req = https.request(options, (res) => {
            console.log('GET-->statusCode:', res.statusCode);
            // console.log('GET-->headers:', res.headers);

            res.on('data', (d) => {
                // process.stdout.write(d);
                getApproveResultByEachMail(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });
        req.end();
    }

    function getApproveResultByEachMail(data) {

        var jsonObject = JSON.parse(data);
        jsonObject.forEach(function (element) {
            var mailPreContent = element.BodyPreview;
            var mailContent = element.Body.Content;
            var mailId = element.Id;

            var prIdList = parseHtml(mailContent);
            approveResultByPrId(mailPreContent, prIdList);
            // update mail IsRead = true by mailId
            updateMail(mailId);

        });

    }

    function approveResultByPrId(str, prIdList) {
        var strIndex = str.indexOf("\r\n");
        str = str.substring(0, strIndex);
        console.log(str);
        str = str.replace(" ", "").replace("，", ",");
        var strList = str.split(",");

        // let tx = db.tx();

        prIdList.forEach(function (prId) {

            if (str === "approveall") {
                updatePurchaseRequisitionItems(prId, "B");
                console.log(prId + " update all B");
            } else if (str === "rejectall") {
                updatePurchaseRequisitionItems(prId, "C");
                console.log(prId + " update all C");
            } else {
                strList.forEach(function (item) {
                    var index = item.indexOf(prId);
                    var result = "";
                    if (index != -1) {
                        result = item.replace(prId + "-", "");
                        console.log(result);
                        if (result === "approve") {
                            updatePurchaseRequisitionItems(prId, "B");
                            console.log(prId + " update B");
                        }
                        if (result === "reject") {
                            updatePurchaseRequisitionItems(prId, "C");
                            console.log(prId + " update C");
                        }
                    }
                });
            }
        });

        // tx.commit();
        // console.log("commit ok");

    }

    function parseHtml(html) {
        var results = html.match(/Purchase Requisition Id:(.*?)<\//g);

        var prIdList = [];
        results.forEach(function (element) {

            var prId = element.replace("Purchase Requisition Id:", "").replace("</", "");
            console.log(prId);
            prIdList.push(prId);
        });

        return prIdList;

    }

    async function getPrItem(prId) {
        var tx = db.tx();
        var query = SELECT.from(PurchaseRequisitionItems).columns('PurchaseRequisitionItem').where("PurchaseRequisition=", prId);

        var res = await tx.run(query);
        await tx.commit();
        return res;

    }

    async function updatePurchaseRequisitionItems(prId, releaseCode) {
        var prItemObj = await getPrItem(prId);
        console.log(prItemObj);
        if (prItemObj && prItemObj.length > 0) {
            
            var prItem = prItemObj[0].PurchaseRequisitionItem;
            console.log(prItem);
    
            console.log("-----------update" + prId + ":" + releaseCode);
            
            var tx = db.tx();
            // await cds.run(UPDATE(PurchaseRequisitionItems).set('ReleaseCode=', releaseCode).where('PurchaseRequisition=', prId));
            await tx.run(UPDATE(PurchaseRequisitionItems).set `ReleaseCode=${releaseCode}` .where `PurchaseRequisition=${prId}`);
            await tx.commit();
            console.log(prId + "-----------update ok----------------");
    
            await updateRemoteServiceData(prId, prItem, releaseCode);
        }

    }


    async function sendMail() {
        var currentDate = date.format(new Date(), 'YYYYMMDD');

        var htmlStr = await getMailContent();

        var post_data = {
            "Body": {
                "Content": htmlStr,
                "ContentType": "HTML"
            },
            "From": {
                "EmailAddress": {
                    "Address": process.env.fromAddress,
                    "Name": process.env.fromName
                }
            },
            "Importance": "High",
            "InferenceClassification": "Focused",
            "IsDeliveryReceiptRequested": false,
            "IsRead": false,
            "IsReadReceiptRequested": false,
            "Sender": {
                "EmailAddress": {
                    "Address": process.env.fromAddress,
                    "Name": process.env.fromName
                }
            },
            "Subject": "Purchase approval application " + currentDate,
            "ToRecipients": [
                {
                    "EmailAddress": {
                        "Address": process.env.toAddress,
                        "Name": process.env.toName
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
                'Authorization': process.env.authorization,
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

    function updateMail(mailId) {

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
                'Authorization': process.env.authorization,
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




