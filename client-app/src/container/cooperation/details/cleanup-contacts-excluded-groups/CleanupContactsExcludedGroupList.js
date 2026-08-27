import React from 'react';

import CleanupContactsExcludedGroupItem from './CleanupContactsExcludedGroupItem';

const CleanupContactsExcludedGroupList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Uitzonderingsgroepen voor opschonen contacten</div>
                <div className="col-sm-1" />
            </div>
            {props.cleanupContactsExcludedGroups.length > 0 ? (
                props.cleanupContactsExcludedGroups.map(cleanupContactsExcludedGroup => {
                    return (
                        <CleanupContactsExcludedGroupItem
                            key={cleanupContactsExcludedGroup.id}
                            showEditCooperation={props.showEditCooperation}
                            cleanupContactsExcludedGroup={cleanupContactsExcludedGroup}
                            removeResult={props.removeResult}
                        />
                    );
                })
            ) : (
                <div>Geen uitzonderingsgroepen voor opschonen bekend.</div>
            )}
        </div>
    );
};

export default CleanupContactsExcludedGroupList;
