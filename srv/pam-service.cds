using { procurementapprovalmanagement as pam } from '../db/schema';

@path: 'service/pam'
service PamService {
  entity PurchaseRequisitionItems as projection on pam.PurchaseRequisitionItems;
    annotate PurchaseRequisitionItems with @odata.draft.enabled;
  entity PurchaseRequisitions as projection on pam.PurchaseRequisitions;
}