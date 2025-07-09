import React from 'react';
import CleanupItem from './CleanupItem';

const CleanupItemsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-8">Naam</div>
                <div className="col-sm-3">Ouder dan</div>
                <div className="col-sm-1" />
            </div>
            {props.cleanupItems?.map(cleanupItem => {
                    return (
                        <CleanupItem
                            key={cleanupItem.id}
                            showEditCooperation={props.showEditCooperation}
                            cleanupItem={cleanupItem}
                            removeResult={props.removeResult}
                        />
                    );
            })}
        </div>
    );
};

export default CleanupItemsList;
