# Card Detail

## Description

Generic component for a card.

## Inputs

* baCard

Name                |Type       |  Description                                                  | Default Value
------------------- | --------- |---------------------------------------------------------------------- | ----
isOpenedHeader      | boolean   | If the card is expanded/collapsed                                     | true
title               | string    | Card title                                                            |
locale              | string    | Locale                                                                | 'fr'
actions             |           | Allowed actions for the card header Example: {add:true, delete: true} |

* Widget List (Content Container)

Name                |Type           |  Description                                      | Default Value
------------------- | ------------------------- |------------------------------------------------- |---
parentId            | string                    | Parent identifier for uniqueness                 | ''
displayMode         | string                    | Display mode. Specifies if edit is allowed       |
database            | string                    | Database name                                    |
collectionId        | string                    | Collection identifier                            |
collection          | any                       | Collection to display/edit                       |
originalCollection  | any                       | Original collection                              |
cards               | FormArray                 | Form array to add the card to                    |
content             | CardContentConfiguration  | Settings for view table component                |
columnSize          | number                | What part of the screen to take (bootstrap is used)  |

For more details see [Widget List Documentation](../contentContainer/README.md)

* Tree Explorer

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------
onShowDetails       | Triggered when card is expanded/collapsed

## Dependencies

* baCard
* [Widget List](../contentContainer/README.md)
* [Tree explorer](../tree/treeExplorer/README.md)

## Examples

* Content input:
```
 {
     type: 'simpleInputs',
     fields: [
               [ 
                {
                   field: 'code',
                   type: 'input',
                   disabledDisplayModes: 'u',
                   validators: {isRequired: true},
                   columnSize: 6
                }
                ]
            ]
  }
```