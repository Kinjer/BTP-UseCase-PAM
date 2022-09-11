using PamService as service from '../../srv/pam-service';

// List Report Page
annotate service.PurchaseRequisitionItems with @(
    UI.HeaderInfo : {
       TypeName : 'Purchase Requisition Item',
       TypeNamePlural : 'Purchase Requisition Items',
       Title : {
          $Type : 'UI.DataField',
          Value : PurchaseRequisition
       },
       Description : {
          $Type : 'UI.DataField',
          Value : PurchaseRequisitionItemText
       }
    },
    UI.SelectionFields : [PurchaseRequisition],
    UI.Identification : [{Value : PurchaseRequisition}],
    // Define the table columns
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : PurchaseRequisition,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : PurchasingDocument,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : PurchaseRequisitionItemText,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : Material,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : RequestedQuantity,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : PurchaseRequisitionPrice,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
        {
            $Type : 'UI.DataField',
            Value : ReleaseCode,
            ![@HTML5.CssDefaults] : {width : '100%'}
        },
    ]
);

// Object Page
annotate service.PurchaseRequisitionItems with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisition,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionItem,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingDocument,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingDocumentItem,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnReleaseStatus,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionType,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingDocumentSubtype,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingDocumentItemCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionItemText,
            },
            {
                $Type : 'UI.DataField',
                Value : AccountAssignmentCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : Material,
            },
            {
                $Type : 'UI.DataField',
                Value : MaterialGroup,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingDocumentCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : RequestedQuantity,
            },
            {
                $Type : 'UI.DataField',
                Value : BaseUnit,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionPrice,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnPriceQuantity,
            },
            {
                $Type : 'UI.DataField',
                Value : MaterialGoodsReceiptDuration,
            },
            {
                $Type : 'UI.DataField',
                Value : ReleaseCode,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionReleaseDate,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingOrganization,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingGroup,
            },
            {
                $Type : 'UI.DataField',
                Value : Plant,
            },
            {
                $Type : 'UI.DataField',
                Value : CompanyCode,
            },
            {
                $Type : 'UI.DataField',
                Value : SourceOfSupplyIsAssigned,
            },
            {
                $Type : 'UI.DataField',
                Value : SupplyingPlant,
            },
            {
                $Type : 'UI.DataField',
                Value : OrderedQuantity,
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryDate,
            },
            {
                $Type : 'UI.DataField',
                Value : CreationDate,
            },
            {
                $Type : 'UI.DataField',
                Value : ProcessingStatus,
            },
            {
                $Type : 'UI.DataField',
                Value : ExternalApprovalStatus,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchasingInfoRecord,
            },
            {
                $Type : 'UI.DataField',
                Value : Supplier,
            },
            {
                $Type : 'UI.DataField',
                Value : IsDeleted,
            },
            {
                $Type : 'UI.DataField',
                Value : FixedSupplier,
            },
            {
                $Type : 'UI.DataField',
                Value : RequisitionerName,
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : CreatedByUser,
            // },
            {
                $Type : 'UI.DataField',
                Value : PurReqCreationDate,
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryAddressID,
            },
            {
                $Type : 'UI.DataField',
                Value : ManualDeliveryAddressID,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnItemCurrency,
            },
            {
                $Type : 'UI.DataField',
                Value : MaterialPlannedDeliveryDurn,
            },
            {
                $Type : 'UI.DataField',
                Value : DelivDateCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : MultipleAcctAssgmtDistribution,
            },
            {
                $Type : 'UI.DataField',
                Value : StorageLocation,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSSPRequestor,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSSPAuthor,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseContract,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSourceOfSupplyType,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseContractItem,
            },
            {
                $Type : 'UI.DataField',
                Value : ConsumptionPosting,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnOrigin,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSSPCatalog,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSSPCatalogItem,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnSSPCrossCatalogItem,
            },
            {
                $Type : 'UI.DataField',
                Value : IsPurReqnBlocked,
            },
            {
                $Type : 'UI.DataField',
                Value : ItemDeliveryAddressID,
            },
            {
                $Type : 'UI.DataField',
                Value : Language,
            },
            {
                $Type : 'UI.DataField',
                Value : IsClosed,
            },
            {
                $Type : 'UI.DataField',
                Value : ReleaseIsNotCompleted,
            },
            {
                $Type : 'UI.DataField',
                Value : ServicePerformer,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductType,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionStatus,
            },
            {
                $Type : 'UI.DataField',
                Value : ReleaseStrategy,
            },
            {
                $Type : 'UI.DataField',
                Value : PerformancePeriodStartDate,
            },
            {
                $Type : 'UI.DataField',
                Value : PerformancePeriodEndDate,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseOrderPriceType,
            },
            {
                $Type : 'UI.DataField',
                Value : SupplierMaterialNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : Batch,
            },
            {
                $Type : 'UI.DataField',
                Value : MaterialRevisionLevel,
            },
            {
                $Type : 'UI.DataField',
                Value : MinRemainingShelfLife,
            },
            {
                $Type : 'UI.DataField',
                Value : ItemNetAmount,
            },
            {
                $Type : 'UI.DataField',
                Value : GoodsReceiptIsExpected,
            },
            {
                $Type : 'UI.DataField',
                Value : InvoiceIsExpected,
            },
            {
                $Type : 'UI.DataField',
                Value : GoodsReceiptIsNonValuated,
            },
            {
                $Type : 'UI.DataField',
                Value : RequirementTracking,
            },
            {
                $Type : 'UI.DataField',
                Value : MRPController,
            },
            {
                $Type : 'UI.DataField',
                Value : TaxCode,
            },
            {
                $Type : 'UI.DataField',
                Value : PurchaseRequisitionIsFixed,
            },
            {
                $Type : 'UI.DataField',
                Value : AddressID,
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : LastChangeDateTime,
            // },
            {
                $Type : 'UI.DataField',
                Value : Reservation,
            },
            {
                $Type : 'UI.DataField',
                Value : ExpectedOverallLimitAmount,
            },
            {
                $Type : 'UI.DataField',
                Value : OverallLimitAmount,
            },
            {
                $Type : 'UI.DataField',
                Value : PurContractForOverallLimit,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnExternalReference,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnItemExternalReference,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnExternalSystemId,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnExternalSystemType,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnTypeExternalReference,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnProcessingType,
            },
            {
                $Type : 'UI.DataField',
                Value : PurReqnProcessingDateTime,
            },
            {
                $Type : 'UI.DataField',
                Value : ProcmtHubBackendBusSyst,
            },
            {
                $Type : 'UI.DataField',
                Value : SSPAuthorExternalBPIdnNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : SSPReqrUserId,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
