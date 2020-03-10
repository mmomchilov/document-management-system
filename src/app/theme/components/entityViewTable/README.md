# Entity View Table

## Description

Generic component containing: button, search bar and table. The button and the search bar can be hidden with inputs. If an entity from the table is being updated at the moment, it's surrounded in orange rectangle (using monitoring service).

## Inputs

* Main

Name                |Type       |  Description
------------------- | --------- |---------------------------------------------
buttonHide          | boolean   | Specifies if the button will be shown or not
buttonLabel         | string    | Label for the button shown on the page
hasSearchBar        | boolean   | Specifies if there will be search bar or not

* View Table 

Name                |Type       |  Description
------------------- | --------- |---------------------------------------------
id                  | string    | Identifier for the table
database            | string    | Database name
collectionId        | string    | Collection identifier
limitPerPage        | number    | Limit of pages for one page
columnsListTofilter |           | Filter constraint
settings            |           | Settings for view table component 

For more details see [View/Edit Table Documentation](../viewTable/README.md)

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------
onClickButton       | Triggered when the button is clicked
onRowSelection      | Triggered when a row from the table is selected

## Dependencies

* [View/Edit Table](../viewTable/README.md)