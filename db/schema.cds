namespace procurementapprovalmanagement;
 using { managed } from '@sap/cds/common';

// using an external service from S/4
using { API_PURCHASEREQ_PROCESS_SRV as external } from '../srv/external/API_PURCHASEREQ_PROCESS_SRV.csn';

entity PurchaseRequisitions as projection on external.A_PurchaseRequisitionItem {
  key PurchaseRequisition,
  PurchaseRequisitionItem,
  PurchasingDocument,
  PurchasingDocumentItem,
  PurReqnReleaseStatus,
  PurchaseRequisitionType,
  PurchasingDocumentSubtype,
  PurchasingDocumentItemCategory,
  PurchaseRequisitionItemText,
  AccountAssignmentCategory,
  Material,
  MaterialGroup,
  PurchasingDocumentCategory,
  RequestedQuantity,
  BaseUnit,
  PurchaseRequisitionPrice,
  PurReqnPriceQuantity,
  MaterialGoodsReceiptDuration,
  ReleaseCode,
  PurchaseRequisitionReleaseDate,
  PurchasingOrganization,
  PurchasingGroup,
  Plant,
  CompanyCode,
  SourceOfSupplyIsAssigned,
  SupplyingPlant,
  OrderedQuantity,
  DeliveryDate,
  CreationDate,
  ProcessingStatus,
  ExternalApprovalStatus,
  PurchasingInfoRecord,
  Supplier,
  IsDeleted,
  FixedSupplier,
  RequisitionerName,
  // CreatedByUser,
  PurReqCreationDate,
  DeliveryAddressID,
  ManualDeliveryAddressID,
  PurReqnItemCurrency,
  MaterialPlannedDeliveryDurn,
  DelivDateCategory,
  MultipleAcctAssgmtDistribution,
  StorageLocation,
  PurReqnSSPRequestor,
  PurReqnSSPAuthor,
  PurchaseContract,
  PurReqnSourceOfSupplyType,
  PurchaseContractItem,
  ConsumptionPosting,
  PurReqnOrigin,
  PurReqnSSPCatalog,
  PurReqnSSPCatalogItem,
  PurReqnSSPCrossCatalogItem,
  IsPurReqnBlocked,
  ItemDeliveryAddressID,
  Language,
  IsClosed,
  ReleaseIsNotCompleted,
  ServicePerformer,
  ProductType,
  PurchaseRequisitionStatus,
  ReleaseStrategy,
  PerformancePeriodStartDate,
  PerformancePeriodEndDate,
  PurchaseOrderPriceType,
  SupplierMaterialNumber,
  Batch,
  MaterialRevisionLevel,
  MinRemainingShelfLife,
  ItemNetAmount,
  GoodsReceiptIsExpected,
  InvoiceIsExpected,
  GoodsReceiptIsNonValuated,
  RequirementTracking,
  MRPController,
  TaxCode,
  PurchaseRequisitionIsFixed,
  AddressID,
  // LastChangeDateTime,
  Reservation,
  ExpectedOverallLimitAmount,
  OverallLimitAmount,
  PurContractForOverallLimit,
  PurReqnExternalReference,
  PurReqnItemExternalReference,
  PurReqnExternalSystemId,
  PurReqnExternalSystemType,
  PurReqnTypeExternalReference,
  PurReqnProcessingType,
  PurReqnProcessingDateTime,
  ProcmtHubBackendBusSyst,
  SSPAuthorExternalBPIdnNumber,
  SSPReqrUserId
} 

 entity PurchaseRequisitionItems : managed {
   key PurchaseRequisition : String(10);
   PurchaseRequisitionItem : String(5);
   PurchasingDocument : String(10);
   PurchasingDocumentItem : String(5);
   PurReqnReleaseStatus : String(2);
   PurchaseRequisitionType : String(4);
   PurchasingDocumentSubtype : String(1);
   PurchasingDocumentItemCategory : String(1);
   PurchaseRequisitionItemText : String(40);
   AccountAssignmentCategory : String(1);
   Material : String(40);
   MaterialGroup : String(9);
   PurchasingDocumentCategory : String(1);
   RequestedQuantity : String;
   BaseUnit : String(3);
   PurchaseRequisitionPrice : String;
   PurReqnPriceQuantity : String;
   MaterialGoodsReceiptDuration : String;
   ReleaseCode : String(1);
   PurchaseRequisitionReleaseDate : String;
   PurchasingOrganization : String(4);
   PurchasingGroup : String(3);
   Plant : String(4);
   CompanyCode : String(4);
   SourceOfSupplyIsAssigned : Boolean;
   SupplyingPlant : String(4);
   OrderedQuantity : String;
   DeliveryDate : String;
   CreationDate : String;
   ProcessingStatus : String(1);
   ExternalApprovalStatus : String(1);
   PurchasingInfoRecord : String(10);
   Supplier : String(10);
   IsDeleted : String(1);
   FixedSupplier : String(10);
   RequisitionerName : String(12);
//    CreatedByUser : String(12);
   PurReqCreationDate : String;
   DeliveryAddressID : String(10);
   ManualDeliveryAddressID : String(10);
   PurReqnItemCurrency : String(5);
   MaterialPlannedDeliveryDurn : String;
   DelivDateCategory : String(1);
   MultipleAcctAssgmtDistribution : String(1);
   StorageLocation : String(4);
   PurReqnSSPRequestor : String(60);
   PurReqnSSPAuthor : String(12);
   PurchaseContract : String(10);
   PurReqnSourceOfSupplyType : String(1);
   PurchaseContractItem : String(5);
   ConsumptionPosting : String(1);
   PurReqnOrigin : String(1);
   PurReqnSSPCatalog : String(20);
   PurReqnSSPCatalogItem : String(40);
   PurReqnSSPCrossCatalogItem : Integer;
   IsPurReqnBlocked : String(1);
   ItemDeliveryAddressID : String(10);
   Language : String(2);
   IsClosed : Boolean;
   ReleaseIsNotCompleted : Boolean;
   ServicePerformer : String(10);
   ProductType : String(2);
   PurchaseRequisitionStatus : String(8);
   ReleaseStrategy : String(2);
   PerformancePeriodStartDate : String;
   PerformancePeriodEndDate : String;
   PurchaseOrderPriceType : String(1);
   SupplierMaterialNumber : String(35);
   Batch : String(10);
   MaterialRevisionLevel : String(2);
   MinRemainingShelfLife : String;
   ItemNetAmount : String;
   GoodsReceiptIsExpected : Boolean;
   InvoiceIsExpected : Boolean;
   GoodsReceiptIsNonValuated : Boolean;
   RequirementTracking : String(10);
   MRPController : String(3);
   TaxCode : String(2);
   PurchaseRequisitionIsFixed : Boolean;
   AddressID : String(10);
//   LastChangeDateTime : String;
   Reservation : String(10);
   ExpectedOverallLimitAmount : String;
   OverallLimitAmount : String;
   PurContractForOverallLimit : String(10);
   PurReqnExternalReference : String(35);
   PurReqnItemExternalReference : String(10);
   PurReqnExternalSystemId : String(60);
   PurReqnExternalSystemType : String(1);
   PurReqnTypeExternalReference : String(4);
   PurReqnProcessingType : String(1);
   PurReqnProcessingDateTime : String(14);
   ProcmtHubBackendBusSyst : String(60);
   SSPAuthorExternalBPIdnNumber : String(60);
   SSPReqrUserId : String(12);
 }

//  entity PurchaseRequisitionItems : managed {
//  key PurchaseRequisition : String(10);
//  PurchaseRequisitionItem : String(5);
//  PurchasingDocument : String(10);
//  PurchasingDocumentItem : String(5);
//  PurReqnReleaseStatus : String(2);
//  PurchaseRequisitionType : String(4);
//  PurchasingDocumentSubtype : String(1);
//  PurchasingDocumentItemCategory : String(1);
//  PurchaseRequisitionItemText : String(40);
//  AccountAssignmentCategory : String(1);
//  Material : String(40);
//  MaterialGroup : String(9);
//  PurchasingDocumentCategory : String(1);
//  RequestedQuantity : String;
//  BaseUnit : String(3);
//  PurchaseRequisitionPrice : String;
//  PurReqnPriceQuantity : String;
//  MaterialGoodsReceiptDuration : String;
//  ReleaseCode : String(1);
//  PurchaseRequisitionReleaseDate : String;
//  PurchasingOrganization : String(4);
//  PurchasingGroup : String(3);
//  Plant : String(4);
//  CompanyCode : String(4);
//  SourceOfSupplyIsAssigned : Boolean;
//  SupplyingPlant : String(4);
//  OrderedQuantity : String;
//  DeliveryDate : String;
//  CreationDate : String;
//  ProcessingStatus : String(1);
//  ExternalApprovalStatus : String(1);
//  PurchasingInfoRecord : String(10);
//  Supplier : String(10);
//  IsDeleted : String(1);
//  FixedSupplier : String(10);
//  RequisitionerName : String(12);
// //  CreatedByUser : String(12);
//  PurReqCreationDate : String;
//  DeliveryAddressID : String(10);
//  ManualDeliveryAddressID : String(10);
//  PurReqnItemCurrency : String(5);
//  MaterialPlannedDeliveryDurn : String;
//  DelivDateCategory : String(1);
//  MultipleAcctAssgmtDistribution : String(1);
//  StorageLocation : String(4);
//  PurReqnSSPRequestor : String(60);
//  PurReqnSSPAuthor : String(12);
//  PurchaseContract : String(10);
//  PurReqnSourceOfSupplyType : String(1);
//  PurchaseContractItem : String(5);
//  ConsumptionPosting : String(1);
//  PurReqnOrigin : String(1);
//  PurReqnSSPCatalog : String(20);
//  PurReqnSSPCatalogItem : String(40);
//  PurReqnSSPCrossCatalogItem : Integer;
//  IsPurReqnBlocked : String(1);
//  ItemDeliveryAddressID : String(10);
//  Language : String(2);
//  IsClosed : Boolean;
//  ReleaseIsNotCompleted : Boolean;
//  ServicePerformer : String(10);
//  ProductType : String(2);
//  PurchaseRequisitionStatus : String(8);
//  ReleaseStrategy : String(2);
//  PerformancePeriodStartDate : String;
//  PerformancePeriodEndDate : String;
//  PurchaseOrderPriceType : String(1);
//  SupplierMaterialNumber : String(35);
//  Batch : String(10);
//  MaterialRevisionLevel : String(2);
//  MinRemainingShelfLife : String;
//  ItemNetAmount : String;
//  GoodsReceiptIsExpected : Boolean;
//  InvoiceIsExpected : Boolean;
//  GoodsReceiptIsNonValuated : Boolean;
//  RequirementTracking : String(10);
//  MRPController : String(3);
//  TaxCode : String(2);
//  PurchaseRequisitionIsFixed : Boolean;
//  AddressID : String(10);
// //  LastChangeDateTime : String;
//  Reservation : String(10);
//  ExpectedOverallLimitAmount : String;
//  OverallLimitAmount : String;
//  PurContractForOverallLimit : String(10);
//  PurReqnExternalReference : String(35);
//  PurReqnItemExternalReference : String(10);
//  PurReqnExternalSystemId : String(60);
//  PurReqnExternalSystemType : String(1);
//  PurReqnTypeExternalReference : String(4);
//  PurReqnProcessingType : String(1);
//  PurReqnProcessingDateTime : String(14);
//  ProcmtHubBackendBusSyst : String(60);
//  SSPAuthorExternalBPIdnNumber : String(60);
//  SSPReqrUserId : String(12);
//  }
