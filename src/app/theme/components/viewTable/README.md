# View/Edit Table

## Description

Generic component for a table based on ng2-smart-table. 

* Editable or not 
    * It can be for view or edit depending on the display mode. The table is in view mode for value 'r', else it's an editable table. 
* Table data
    * If data input is specified - this is taken with priority for the table data
    * If data is not specified, a service is used to load entities for the given database and collection identifier. Keyword can be used to filter the result.

## Inputs

Name                |Type       |  Description                                  | Default Value 
------------------- | --------- |---------------------------------------------- | ------------
displayMode         | string    | Display mode.                                 | 'r'          
id                  | string    | Table identifier. Used for monitoring.        |
database            | string    | Database name                                 |
collectionId        | string    | Collection identifier                         |
limitPerPage        | number    | Limit of pages for one page                   |
columnsListTofilter |           | Filter constraint                             |
settings            | list      | Settings for smart table                      |
data                | list      | Data for the table.                           |
keyWord             | string    | Used to filter the table data by  the service |
hasMonitoring       | boolean   | Specifies if monitoring service to be used    | false

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------
userRowClick        | Triggered when a row from the table is selected
editConfirm         | Propagated edit.confirmSave from ng2-smart-table 
createConfirm       | Propagated add.confirmCreate from ng2-smart-table
deleteConfirm       | Propagated delete.confirmDelete from ng2-smart-table