import React from 'react';
import CleanupItem from './CleanupItem';

const CleanupItemsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-5">Naam</div>
                <div className="col-sm-2">Ouder dan</div>
                <div className="col-sm-2">Laatst bepaald</div>
                <div className="col-sm-2">Aantal</div>
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
