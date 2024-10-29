import React from 'react';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const PortalFreeFieldsFieldsView = props => {
    const { id, changePortal } = props.portalFreeFieldsField;
    const { fieldName } = props.portalFreeFieldsField.freeFieldsField;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-6">{fieldName}</div>
                <div className="col-sm-5">{changePortal === 1 ? 'Ja' : 'Nee'}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <>
                        <a role="button" onClick={props.openEdit}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default PortalFreeFieldsFieldsView;
