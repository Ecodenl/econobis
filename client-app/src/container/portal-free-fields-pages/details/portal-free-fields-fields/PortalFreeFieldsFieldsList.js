import React from 'react';

import PortalFreeFieldsFieldsItem from './PortalFreeFieldsFieldsItem';

const PortalFreeFieldsFieldsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-6">Veld</div>
                <div className="col-sm-5">Aanpasbaar</div>
                <div className="col-sm-1" />
            </div>
            {props.portalFreeFieldsFields.length > 0 ? (
                props.portalFreeFieldsFields.map(portalFreeFieldsField => {
                    return (
                        <PortalFreeFieldsFieldsItem
                            key={portalFreeFieldsField.id}
                            showEditPage={props.showEditPage}
                            portalFreeFieldsField={portalFreeFieldsField}
                            removeResult={props.removeResult}
                        />
                    );
                })
            ) : (
                <div>Geen gegevens bekend.</div>
            )}
        </div>
    );
};

export default PortalFreeFieldsFieldsList;
