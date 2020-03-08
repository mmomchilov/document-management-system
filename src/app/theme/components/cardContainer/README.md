# Card Container

## Description

Generic component containing cards.

## Inputs

* Main

Name                |Type       |  Description                                 | Default Value
------------------- | --------- |--------------------------------------------- | ---------------
id                  | string    | Identifier for the form                      | 'cards'
parentForm          | FormGroup | Parent form

* Card Detail 

Name                |Type                   |  Description
------------------- | --------------------- |---------------------------------------------
displayMode         | string                | Display mode. Specifies if edit is allowed
database            | string                | Database name
collectionId        | string                | Collection identifier
collection          | any                   | Collection to display/edit
configs             | CardConfiguration[]   | Settings for view table component 

For more details see [Card Detail Documentation](../cardDetail/README.md)

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------
onShowDetails       | Triggered when card is expanded/collapsed

## Dependencies

* [Card Detail](../cardDetail/README.md)

## Examples

* Configs input:
```
[
{
    title: 'localizationResource.database.information.shortLabel',
    isOpenedHeader: true,
    columnSize: 8,
    content: {
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
}
]
```