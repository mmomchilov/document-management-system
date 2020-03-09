import { ValidationComponent } from './pages/common/components/common/validation';
import { Component, OnInit, ChangeDetectorRef, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ValidationComponent implements OnInit // , DoCheck, OnDestroy
{
  // constructor(){};

  title = 'document-management-system right?';
  configs = [
    {
      "isOpenedHeader": true,
      "columnSize": 12,
      "content": {
        "type": "simpleInputs",
        "selectedTab": "financialFlows",
        "tabs": [
          {
            "field": "financialFlowsTab",
            "filterName": "financialFlows",
            "label": "Financial flows on accounting year 2020 MIMI"
          },
          {
            "field": "healthDashboardsTab",
            "filterName": "healthDashboards",
            "label": "Health benefits"
          },
          {
            "field": "riskDashboardsTab",
            "filterName": "riskDashboards",
            "label": "Risk benefits"
          }
        ],
        "fields": [
          [
            {
              "type": "editableTable",
              "filter": "healthDashboards",
              "columnSize": 12,
              "settings": {
                "tableTitle": "Processed data in number and amount  - accounting year 2020  and the previous accounting year",
                "hideSubHeader": true,
                "columns": {
                  "medicalreimbursementDateFamlyLabel": {
                    "title": "Acts family",
                    "width": "10%",
                    "type": "html",
                    "rank": 1
                  },
                  "numberOfActsPY": {
                    "title": "Number of acts N-1",
                    "width": "4%",
                    "type": "html",
                    "rank": 2
                  },
                  "numberOfActs": {
                    "title": "Number of acts N",
                    "width": "4%",
                    "type": "html",
                    "rank": 3
                  },
                  "numberOfActsRatio": {
                    "title": "Ratio N/N-1",
                    "width": "5%",
                    "rank": 4
                  },
                  "totalRealChargesPY": {
                    "title": "Real charges N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 5
                  },
                  "totalRealCharges": {
                    "title": "Real charges N",
                    "width": "10%",
                    "type": "html",
                    "rank": 6
                  },
                  "totalSSReimbursementPY": {
                    "title": "National refunds made N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 7
                  },
                  "totalSSReimbursement": {
                    "title": "National refunds made N",
                    "width": "10%",
                    "type": "html",
                    "rank": 8
                  },
                  "totalDelegatePaymentPY": {
                    "title": "DG settlements N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 9
                  },
                  "totalDelegatePayment": {
                    "title": "DG settlements N",
                    "width": "10%",
                    "type": "html",
                    "rank": 10
                  },
                  "totalDelegatePaymentRatio": {
                    "title": "Ratio N/N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 11
                  },
                  "totalOtherReimbursementPY": {
                    "title": "Other refund N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 12
                  },
                  "totalOtherReimbursement": {
                    "title": "Other refund N",
                    "width": "10%",
                    "type": "html",
                    "rank": 13
                  },
                  "excessPY": {
                    "title": "Remains at the charge N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 14
                  },
                  "excess": {
                    "title": "Remains at the charge N",
                    "width": "10%",
                    "type": "html",
                    "rank": 15
                  },
                  "excessRatio": {
                    "title": "Ratio N/N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 16
                  },
                  "insuredUsersNumberPY": {
                    "title": "Nb of insured consumers N-1",
                    "width": "4%",
                    "type": "html",
                    "rank": 17
                  },
                  "insuredUsersNumber": {
                    "title": "Nb of insured consumers N",
                    "width": "4%",
                    "type": "html",
                    "rank": 18
                  }
                },

              },
              "items": [
                {
                  "medicalreimbursementDateFamlyLabel": "Optique",
                  "numberOfActsPY": 5,
                  "numberOfActs": 0,
                  "totalRealChargesPY": 70,
                  "totalRealCharges": 0,
                  "totalSSReimbursementPY": 17,
                  "totalSSReimbursement": 0,
                  "totalDelegatePaymentPY": 24,
                  "totalDelegatePayment": 0,
                  "totalOtherReimbursementPY": 15,
                  "totalOtherReimbursement": 0,
                  "insuredUsersNumberPY": 5,
                  "insuredUsersNumber": 0,
                  "excessPY": 14,
                  "excess": 0,
                  "numberOfActsRatio": "-1.0000",
                  "totalDelegatePaymentRatio": "-1.0000",
                  "excessRatio": "-1.0000"
                }
              ],
              "tableItems": [
                {
                  "medicalreimbursementDateFamlyLabel": "Optique",
                  "numberOfActsPY": 5,
                  "numberOfActs": 0,
                  "totalRealChargesPY": 70,
                  "totalRealCharges": 0,
                  "totalSSReimbursementPY": 17,
                  "totalSSReimbursement": 0,
                  "totalDelegatePaymentPY": 24,
                  "totalDelegatePayment": 0,
                  "totalOtherReimbursementPY": 15,
                  "totalOtherReimbursement": 0,
                  "insuredUsersNumberPY": 5,
                  "insuredUsersNumber": 0,
                  "excessPY": 14,
                  "excess": 0,
                  "numberOfActsRatio": "-1.0000",
                  "totalDelegatePaymentRatio": "-1.0000",
                  "excessRatio": "-1.0000"
                }
              ]
            },
            {
              "type": "editableTable",
              "filter": "riskDashboards",
              "columnSize": 12,
              "settings": {
                "tableTitle": "Third tab's Table!!!!!!!",
                "hideSubHeader": true,
                "columns": {
                  "riskFamily": {
                    "title": "Risk family",
                    "width": "10%",
                    "type": "html",
                    "rank": 1
                  },
                  "srvcType": {
                    "title": "Settlement type",
                    "width": "10%",
                    "type": "html",
                    "rank": 2
                  },
                  "clmFldrNbr1": {
                    "title": "Number of claim folders N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 3
                  },
                  "clmFldrNbr": {
                    "title": "Number of claim folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 4
                  },
                  "opndClmFldrNbr": {
                    "title": "Number of opened claim folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 5
                  },
                  "sttlmntFldrNbr1": {
                    "title": "Number of settlement folders N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 6
                  },
                  "sttlmntFldrNbr": {
                    "title": "Number of settlement folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 7
                  },
                  "beneficiaryNbr1": {
                    "title": "Number of beneficiaries N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 8
                  },
                  "beneficiaryNbr": {
                    "title": "Number of beneficiaries",
                    "width": "5%",
                    "type": "html",
                    "rank": 9
                  },
                  "paidAmount1": {
                    "title": "Paid amounts N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 10
                  },
                  "paidAmount": {
                    "title": "Paid amounts",
                    "width": "10%",
                    "type": "html",
                    "rank": 11
                  },
                  "avrgCost": {
                    "title": "Average annual cost",
                    "width": "10%",
                    "type": "html",
                    "rank": 12
                  },
                  "avrgDuration": {
                    "title": "Average duration of a claim file (nb of days)",
                    "width": "5%",
                    "type": "html",
                    "rank": 13
                  }
                },
                "my": {
                  "riskFamily": {
                    "title": "Risk family",
                    "width": "10%",
                    "type": "html",
                    "rank": 1
                  },
                  "srvcType": {
                    "title": "Settlement type",
                    "width": "10%",
                    "type": "html",
                    "rank": 2
                  },
                  "clmFldrNbr1": {
                    "title": "Number of claim folders N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 3
                  },
                  "clmFldrNbr": {
                    "title": "Number of claim folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 4
                  },
                  "opndClmFldrNbr": {
                    "title": "Number of opened claim folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 5
                  },
                  "sttlmntFldrNbr1": {
                    "title": "Number of settlement folders N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 6
                  },
                  "sttlmntFldrNbr": {
                    "title": "Number of settlement folders",
                    "width": "5%",
                    "type": "html",
                    "rank": 7
                  },
                  "beneficiaryNbr1": {
                    "title": "Number of beneficiaries N-1",
                    "width": "5%",
                    "type": "html",
                    "rank": 8
                  },
                  "beneficiaryNbr": {
                    "title": "Number of beneficiaries",
                    "width": "5%",
                    "type": "html",
                    "rank": 9
                  },
                  "paidAmount1": {
                    "title": "Paid amounts N-1",
                    "width": "10%",
                    "type": "html",
                    "rank": 10
                  },
                  "paidAmount": {
                    "title": "Paid amounts",
                    "width": "10%",
                    "type": "html",
                    "rank": 11
                  },
                  "avrgCost": {
                    "title": "Average annual cost",
                    "width": "10%",
                    "type": "html",
                    "rank": 12
                  },
                  "avrgDuration": {
                    "title": "Average duration of a claim file (nb of days)",
                    "width": "5%",
                    "type": "html",
                    "rank": 13
                  }
                }
              },
              "items": [
                {
                  "riskFamily": "Disability",
                  "srvcType": "Other Claim Settlement",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 17,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 17,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 17,
                  "paidAmount": 0,
                  "paidAmount1": 16827.19,
                  "avrgCost": 0,
                  "avrgDuration": 9
                },
                {
                  "riskFamily": "Disability",
                  "srvcType": "Annuity",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 7,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 7,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 7,
                  "paidAmount": 0,
                  "paidAmount1": 6968.82,
                  "avrgCost": 0,
                  "avrgDuration": 9
                },
                {
                  "riskFamily": "Incapacity",
                  "srvcType": "Medical Fees",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 6,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 6,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 6,
                  "paidAmount": 0,
                  "paidAmount1": 6823.389999999999,
                  "avrgCost": 0,
                  "avrgDuration": 6
                },
                {
                  "riskFamily": "Incapacity",
                  "srvcType": "Daily Allowance",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 79,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 79,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 79,
                  "paidAmount": 0,
                  "paidAmount1": 99225.57,
                  "avrgCost": 0,
                  "avrgDuration": 7.909090909090909
                },
                {
                  "riskFamily": "Death",
                  "srvcType": "Lump Sum",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 6,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 6,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 6,
                  "paidAmount": 0,
                  "paidAmount1": 7913.83,
                  "avrgCost": 0,
                  "avrgDuration": 14.5
                }
              ],
              "tableItems": [
                {
                  "riskFamily": "Disability",
                  "srvcType": "Other Claim Settlement",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 17,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 17,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 17,
                  "paidAmount": 0,
                  "paidAmount1": 16827.19,
                  "avrgCost": 0,
                  "avrgDuration": 9
                },
                {
                  "riskFamily": "Disability",
                  "srvcType": "Annuity",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 7,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 7,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 7,
                  "paidAmount": 0,
                  "paidAmount1": 6968.82,
                  "avrgCost": 0,
                  "avrgDuration": 9
                },
                {
                  "riskFamily": "Incapacity",
                  "srvcType": "Medical Fees",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 6,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 6,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 6,
                  "paidAmount": 0,
                  "paidAmount1": 6823.389999999999,
                  "avrgCost": 0,
                  "avrgDuration": 6
                },
                {
                  "riskFamily": "Incapacity",
                  "srvcType": "Daily Allowance",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 79,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 79,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 79,
                  "paidAmount": 0,
                  "paidAmount1": 99225.57,
                  "avrgCost": 0,
                  "avrgDuration": 7.909090909090909
                },
                {
                  "riskFamily": "Death",
                  "srvcType": "Lump Sum",
                  "clmFldrNbr": 0,
                  "clmFldrNbr1": 6,
                  "opndClmFldrNbr": 0,
                  "sttlmntFldrNbr": 0,
                  "sttlmntFldrNbr1": 6,
                  "beneficiaryNbr": 0,
                  "beneficiaryNbr1": 6,
                  "paidAmount": 0,
                  "paidAmount1": 7913.83,
                  "avrgCost": 0,
                  "avrgDuration": 14.5
                }
              ]
            }
          ]
        ]
      }
    }
  ];

  database = 'agreement';
  collectionId = 'juridical-entity';

  ngOnInit() {
    // if (this.routing.data.navTitle) {
    //   this.navTitle = this.routing.data.navTitle;
    // }
    // this.initDisplayButtons();
    // if (this.juridicalEntity) {
    //   this.manageTitle();
    //   UtilCharts.translateMonths(this.translate);
    //   UtilCharts.translateTitlesList(this.translate);
    //   UtilCharts.translateInfinity(this.translate);
    //   UtilCharts.translateLegendList(this.translate);
    //   UtilCharts.translateHealthTable1Columns(this.translate);
    //   UtilCharts.translateRPTable1Columns(this.translate);
    //   this.setFormGroup(this.fb.group({}));
    //   this.riskCarrierOptions = this.routing.data.riskCarrierOptions;
    //   this.setCardsConfig();
    // } else { this.router.navigate(['pages/partner']); }

  }
}
