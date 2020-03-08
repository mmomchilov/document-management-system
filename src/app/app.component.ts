import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
            "label": "Financial flows on accounting year 2020"
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
              "type": "echart1",
              "columnSize": 6,
              "filter": "financialFlows",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Premiums",
                    "Benefits"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 70,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": true
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": true
                  }
                ],
                "series": [
                  {
                    "name": "Premiums",
                    "type": "bar",
                    "barGap": 0,
                    "label": "labelOption",
                    "data": [
                      0,
                      80000,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "name": "Benefits",
                    "type": "bar",
                    "label": "labelOption",
                    "data": [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                ],
                "color": [
                  "#4573c4",
                  "#ed7d31"
                ],
                "title": {
                  "text": "Premiums - Benefits",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "financialFlows",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Compensation"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": false
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": false
                  }
                ],
                "series": [],
                "color": [
                  "#4573c4"
                ],
                "title": {
                  "text": "Compensation",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "financialFlows",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Health premiums",
                    "Risk premiums"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": true
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": true
                  }
                ],
                "series": [
                  {
                    "name": "Health premiums",
                    "type": "bar",
                    "stack": "all",
                    "data": [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "name": "Risk premiums",
                    "type": "bar",
                    "stack": "all",
                    "data": [
                      0,
                      80000,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                ],
                "color": [
                  "#4573c4",
                  "#ed7d31"
                ],
                "title": {
                  "text": "Premiums by risk",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "financialFlows",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Health benefits",
                    "Risk benefits"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": false
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": false
                  }
                ],
                "series": [],
                "color": [
                  "#4573c4",
                  "#ed7d31"
                ],
                "title": {
                  "text": "Benefits by risk",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "healthDashboards",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Health benefits 2019",
                    "Health benefits 2020"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": true
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": true
                  }
                ],
                "series": [
                  {
                    "name": "Health benefits 2019",
                    "type": "bar",
                    "barGap": 0,
                    "label": "labelOption",
                    "data": [
                      0,
                      539.58,
                      0,
                      0,
                      24,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  },
                  {
                    "name": "Health benefits 2020",
                    "type": "bar",
                    "label": "labelOption",
                    "data": [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                ],
                "color": [
                  "#4573c4",
                  "#ed7d31"
                ],
                "title": {
                  "text": "Paid amounts on accounting year 2020  and the previous accounting year",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "healthDashboards",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Settlement from 2018",
                    "Settlement from 2019",
                    "Settlement from 2020"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": false
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": false
                  }
                ],
                "series": [],
                "color": [
                  "#ffc000",
                  "#70ad47",
                  "#9e480e"
                ],
                "title": {
                  "text": "Amounts by effect date paid on the accounting year 2020",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
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
                "[object Object]": {
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
                }
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
              "type": "echart1",
              "columnSize": 6,
              "filter": "riskDashboards",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Risk benefits 2019",
                    "Risk benefits 2020"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": true
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": true
                  }
                ],
                "series": [
                  {
                    "name": "Risk benefits 2019",
                    "type": "bar",
                    "barGap": 0,
                    "label": "labelOption",
                    "data": [
                      10725.75,
                      7948.22,
                      12541.3,
                      11587.96,
                      11921.67,
                      18626.09,
                      9512.52,
                      9878.82,
                      9074.02,
                      8806.98,
                      8773.23,
                      18362.239999999998
                    ]
                  },
                  {
                    "name": "Risk benefits 2020",
                    "type": "bar",
                    "label": "labelOption",
                    "data": [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ]
                  }
                ],
                "color": [
                  "#4573c4",
                  "#ed7d31"
                ],
                "title": {
                  "text": "Paid amounts on accounting year 2020  and the previous accounting year",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "echart1",
              "columnSize": 6,
              "filter": "riskDashboards",
              "options": {
                "tooltip": {
                  "trigger": "item",
                  "formatter": "{a} : {c}",
                  "axisPointer": {
                    "type": "shadow"
                  }
                },
                "legend": {
                  "y": "bottom",
                  "x": "center",
                  "show": true,
                  "data": [
                    "Incapacity",
                    "Invalidity",
                    "Death"
                  ],
                  "padding": [
                    40,
                    0,
                    0,
                    0
                  ]
                },
                "toolbox": {
                  "show": true,
                  "feature": {
                    "mark": {
                      "show": true
                    },
                    "dataView": {
                      "show": true,
                      "readOnly": true,
                      "title": "liste données",
                      "lang": [
                        "Liste des données",
                        "fermer",
                        "actualiser"
                      ]
                    },
                    "magicType": {
                      "show": true,
                      "type": [
                        "pie",
                        "funnel"
                      ]
                    }
                  }
                },
                "grid": {
                  "x": 50,
                  "y": 50,
                  "x2": 0,
                  "y2": 70
                },
                "xAxis": [
                  {
                    "type": "category",
                    "axisTick": {
                      "show": false
                    },
                    "data": [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    "axisLabel": {
                      "rotate": 45
                    },
                    "show": false
                  }
                ],
                "yAxis": [
                  {
                    "type": "value",
                    "show": false
                  }
                ],
                "series": [],
                "color": [
                  "#4573c4",
                  "#ed7d31",
                  "#a5a5a5"
                ],
                "title": {
                  "text": "Number of claim files opened per month during the year",
                  "textStyle": {
                    "fontFamily": "Roboto,sans-serif",
                    "fontSize": 18,
                    "fontWeight": 500,
                    "color": "rgb(98, 98, 98)"
                  }
                }
              }
            },
            {
              "type": "editableTable",
              "filter": "riskDashboards",
              "columnSize": 12,
              "settings": {
                "tableTitle": "Processed data in number and amount  - accounting year 2020  and the previous accounting year",
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
                "[object Object]": {
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
  ]
}
