import React from 'react';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import moment from 'moment';

const CleanupItemView = props => {
    const { name, yearsForDelete, dateDetermined, numberOfItemsToDelete } = props.cleanupItem;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-5">{name}</div>
                <div className="col-sm-2">{yearsForDelete} jaar</div>
                <div className="col-sm-2">{dateDetermined ? moment(dateDetermined).format('L HH:mm') : ''}</div>
                <div className="col-sm-2">{numberOfItemsToDelete}</div>
                <div className="col-sm-1" />{' '}
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <>
                        <a role="button" onClick={props.openEdit}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default CleanupItemView;
