import React from 'react';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const CleanupItemView = props => {
    const { name, yearsForDelete } = props.cleanupItem;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-8">{name}</div>
                <div className="col-sm-3">{yearsForDelete} jaar</div>
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
