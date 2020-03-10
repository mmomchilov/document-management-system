export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'search',
        data: {
          menu: {
            id: 'search',
            title: 'localizationResource.common.title.search.longLabel',
            icon: 'fa fa-search',
            selected: false,
            expanded: false,
            hidden: true,
            order: 0
          }
        }
      },
      {
        path: 'userPrefs',
        data: {
          menu: {
            id: 'userPrefs',
            title: 'localizationResource.common.title.userPrefs.longLabel',
            icon: 'fa fa-user',
            selected: false,
            expanded: false,
            hidden: true,
            order: 0
          }
        }
      },
      {
        path: 'notification',
        data: {
          menu: {
            id: 'notification',
            title: 'localizationResource.common.notifications.shortLabel',
            icon: 'fa fa-user',
            selected: false,
            expanded: false,
            hidden: true,
            order: 0
          }
        }
      },
      {
        path: 'home',
        data: {
          menu: {
            id: 'homeFree',
            title: 'localizationResource.common.title.home.longLabel',
            icon: 'fa fa-bar-chart-o',
            selected: true,
            expanded: false,
            order: 100
          }
        }
      },
      {
        path: ['transferCession', 'portfolio'],
        data: {
          showReferential: false,
          menu: {
            id: 'TCporfolio',
            title: 'localizationResource.common.title.exchangeFollowup.longLabel',
            icon: 'fa fa-compress',
            selected: false,
            expanded: false,
            order: 200
          }
        }
      },
      {
        path: ['transferCession', 'referential'],
        data: {
          menu: {
            id: 'TCreferential',
            title: 'localizationResource.common.title.referentialFollowup.longLabel',
            icon: 'fa fa-compress',
            selected: false,
            expanded: false,
            order: 200
          }
        }
      },
      // EDI Configuration
      {
        data: {
          menu: {
            id: 'ediConfig',
            title: 'localizationResource.common.title.ediConfig.longLabel',
            icon: 'fa fa-wrench',
            selected: false,
            expanded: false,
            order: 300
          }
        },
        children: [
          // Message Configuration
          {
            path: 'messageConfig',
            data: {
              menu: {
                id: 'messageConfig',
                title: 'localizationResource.common.messageConfig.shortLabel',
                icon: 'fa fa-wrench',
                selected: false,
                expanded: false,
                order: 100
              }
            }
          },
          // MultiPR Definition
          {
            path: 'multiprDefinition',
            data: {
              menu: {
                id: 'multiprDefinition',
                title: 'localizationResource.common.multiprDefinition.shortLabel',
                icon: 'fa fa-wrench',
                selected: false,
                expanded: false,
                order: 100
              }
            }
          }]
      },
      {
        data: {
          menu: {
            id: 'partner',
            title: 'localizationResource.common.title.partner.longLabel',
            icon: 'fa fa-sitemap',
            selected: false,
            expanded: false,
            order: 400
          }
        },
        children: [
          /// Juridical Entity
          {
            path: 'juridicalEntity',
            data: {
              menu: {
                id: 'juridicalEntity',
                title: 'localizationResource.common.title.juridicalEntity.shortLabel',
                icon: 'fa fa-building',
                selected: false,
                expanded: false,
                order: 100
              }
            }
          },
          {
            path: 'juridicalEntityDetails',
            data: {
              menu: {
                id: 'juridicalEntityDetails',
                title: 'localizationResource.common.title.agreementNew.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 101
              }
            }
          },
          {
            path: 'updateJuridicalEntityDetails',
            data: {
              menu: {
                id: 'updateJuridicalEntityDetails',
                title: 'localizationResource.common.title.agreementNew.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 102
              }
            }
          },
          {
            path: 'agreementsNew',
            data: {
              menu: {
                id: 'agreementsNew',
                title: 'localizationResource.common.title.agreement.longLabel',
                icon: 'fa fa-file-text',
                selected: false,
                expanded: false,
                order: 200
              }
            }
          },
          {
            path: 'agreementDetails',
            data: {
              menu: {
                id: 'agreementDetails',
                title: 'localizationResource.common.title.agreementNew.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 201
              }
            }
          },
          {
            path: 'agreementAppendice',
            data: {
              menu: {
                id: 'agreementAppendice',
                title: 'localizationResource.common.title.agreementNew.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 202
              }
            }
          },
          {
            path: 'associatedContracts',
            data: {
              menu: {
                id: 'associatedContracts',
                title: 'localizationResource.common.title.associatedContracts.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 202
              }
            }
          },
          {
            path: 'agreementCompensations',
            data: {
              menu: {
                id: 'agreementCompensations',
                selected: false,
                expanded: false,
                hidden: true,
                order: 203
              }
            }
          },
          {
            path: 'contractCompensations',
            data: {
              menu: {
                id: 'contractCompensations',
                selected: false,
                expanded: false,
                hidden: true,
                order: 203
              }
            }
          },
          {
            path: 'updateAgreementDetails',
            data: {
              menu: {
                id: 'updateAgreementDetails',
                title: 'localizationResource.common.title.agreementNew.longLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 201
              }
            }
          },
          {
            path: 'policy',
            data: {
              menu: {
                id: 'policy',
                title: 'localizationResource.common.title.policy.longLabel',
                icon: 'fa fa-folder',
                selected: false,
                expanded: false,
                order: 200
              }
            }
          },
          {
            path: 'contractDetails',
            data: {
              menu: {
                id: 'contractDet',
                title: 'Détails du référentiel contrat',
                selected: false,
                expanded: false,
                hidden: true,
                order: 201
              }
            }
          }
          // {
          //   path: 'compensations',
          //   data: {
          //     menu: {
          //       id: 'Compensations',
          //       title: 'Rémunérations',
          //       icon: 'fa fa-file-text',
          //       selected: false,
          //       expanded: false,
          //       hidden: false,
          //       order: 202
          //     }
          //   }
          // },
          ,

          {
            path: 'partner',
            data: {
              menu: {
                id: 'partner',
                title: 'localizationResource.common.title.partner-space.longLabel',
                icon: 'fa fa-users',
                selected: false,
                expanded: false,
                order: 900,
                disable: false

              }
            }
          },
          {
            path: 'partnerDetails',
            data: {
              menu: {
                id: 'partnerDetails',
                title: 'localizationResource.common.title.partnerDetails.shortLabel',
                selected: false,
                expanded: false,
                hidden: true,
                order: 901
              }
            }
          },
        ]
      },
      {
        path: 'extractData',
        data: {
          menu: {
            id: 'extract',
            title: 'localizationResource.common.title.extract.longLabel',
            icon: 'fa fa-sign-out',
            selected: false,
            expanded: false,
            order: 500
          }
        }
      },
      {
        data: {
          menu: {
            id: 'financial',
            title: 'localizationResource.common.title.financial.longLabel',
            icon: 'fa fa-money',
            selected: false,
            expanded: false,
            order: 600
          }
        },
        children: [
          {
            path: 'maintenance',
            data: {
              menu: {
                id: 'maintenance',
                title: 'localizationResource.common.title.contribution.longLabel',
                icon: 'fa fa-retweet',
                selected: false,
                expanded: false,
                order: 100,
                disable: true
              }
            }
          },
          {
            path: 'maintenance2',
            data: {
              menu: {
                id: 'maintenance2',
                title: 'localizationResource.common.title.capital.longLabel',
                icon: 'fa fa-stack-overflow',
                selected: false,
                expanded: false,
                order: 200,
                disable: true
              }
            }
          },
          {
            path: 'maintenance3',
            data: {
              menu: {
                id: 'maintenance3',
                title: 'localizationResource.common.title.compensation.longLabel',
                icon: 'fa fa-usd',
                selected: false,
                expanded: false,
                order: 300,
                disable: true
              }
            }
          }
        ]
      },
      {
        path: 'maintenance4',
        data: {
          menu: {
            id: 'maintenance4',
            title: 'localizationResource.common.title.rules.longLabel',
            icon: 'fa fa-list',
            selected: false,
            expanded: false,
            order: 700,
            disable: true
          }
        }
      },
      {
        data: {
          menu: {
            id: 'upload',
            title: 'localizationResource.common.title.upload.longLabel',
            icon: 'fa fa-book',
            selected: false,
            expanded: false,
            order: 800,
            url: document.baseURI.replace('/home/', '/files/welcome/'),
            target: '_blank'
          }
        }
      },
      {
        path: 'e52e7ce4ac2458867d05eaad577560db',
        data: {
          menu: {
            id: 'administration',
            title: 'localizationResource.common.title.administration.longLabel',
            icon: 'fa fa-cogs',
            selected: false,
            expanded: false,
            hidden: true,
            order: 900
          }
        }
      },
      {
        path: '42b13851c8e04658a5c2',
        data: {
          menu: {
            id: 'listUser',
            title: 'ListUser',
            icon: 'fa fa-cogs',
            selected: false,
            expanded: false,
            hidden: true,
            order: 900
          }
        }
      }
    ]
  }
];
