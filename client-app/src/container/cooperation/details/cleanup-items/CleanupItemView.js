import React from 'react';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import moment from 'moment';

const CleanupItemView = props => {
    const {
        name,
        dateRef,
        yearsForDelete,
        hasRetentionPeriod,
        // dateDetermined,
        // determinedCount,
        // dateCleanedUp,
        // cleanedCount,
        // failedCount,
    } = props.cleanupItem;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-4">{name}</div>
                <div className="col-sm-3">{dateRef}</div>
                <div className="col-sm-2">{yearsForDelete} jaar</div>
                <div className="col-sm-2">{hasRetentionPeriod ? 'Ja' : 'Nee'}</div>
                {/*<div className="col-sm-1">{dateDetermined ? moment(dateDetermined).format('L HH:mm') : ''}</div>*/}
                {/*<div className="col-sm-1">{determinedCount}</div>*/}
                {/*<div className="col-sm-1">{dateCleanedUp ? moment(dateCleanedUp).format('L HH:mm') : ''}</div>*/}
                {/*<div className="col-sm-1">{cleanedCount}</div>*/}
                {/*<div className="col-sm-1">{failedCount}</div>*/}
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
