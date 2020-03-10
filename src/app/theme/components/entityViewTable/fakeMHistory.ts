export class FakeMHistory {
    static search() {

        return {

            version: [{
                versionID: '1',
                user: 'mmomchilov',
                date: '02/09/2018',
                updatesCount: '1',
                updates: [{
                    changeType: 'Utilisation',
                    fieldName: 'separatorOR',
                    beforeChange: '|',
                    afterChange: '||'
                }]
            },
            {
                versionID: '2',
                user: 'mmomchilov',
                date: '02/09/2018',
                updatesCount: '3',
                updates: [{
                    changeType: 'Utilisation',
                    fieldName: 'separatorOR',
                    beforeChange: '|',
                    afterChange: '||'
                },
                {
                    changeType: 'Utilisation',
                    fieldName: 'separatorOR',
                    beforeChange: '||',
                    afterChange: ''
                }, {
                    changeType: 'Utilisation',
                    fieldName: 'separatorOR',
                    beforeChange: '',
                    afterChange: '||||'
                }]
            }]
        };
    }

    static getChoiceLotModifications() {

        const historyOptionList = [];
        const history = FakeMHistory.search();
        for (const historyVersion of history.version) {
            const versionID = historyVersion.versionID;
            const date = historyVersion.date;
            const user = historyVersion.user;
            const updatesCount = historyVersion.updatesCount;
            const delimeter = '-';
            const displayMessage = versionID.concat(delimeter, date, delimeter, user, delimeter, updatesCount);
            historyOptionList.push({ code: versionID, display: displayMessage });
        }
        
        return historyOptionList;
    }

    static searchByKeyword(keyword) {
        const version = FakeMHistory.search().version.find((val) => val.versionID === keyword);

        const updates = version.updates;
        const versionUpdates = [];
        updates.forEach(element => {
            versionUpdates.push({userCode: version.user, 
                dateHour: version.date, 
                changeType: element.changeType, 
                entityField: element.fieldName,
                beforeChange: element.beforeChange, 
                afterChange: element.afterChange
            });
        });
        return versionUpdates;
    }
}
