import React from 'react';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { fileO } from 'react-icons-kit/fa/fileO';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');
import { connect } from 'react-redux';

const AdministrationDetailsSepasView = props => {
    const { id, name, createdAt, type } = props.sepa;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-3">{id}</div>
                <div className="col-sm-3">{name}</div>
                <div className="col-sm-3">{createdAt ? moment(createdAt).format('L') : ''}</div>
                <div className="col-sm-2">{type ? type.name : ''}</div>
                <div className="col-sm-1">
                    {props.showActionButtons && props.permissions.manageFinancial ? (
                        <a role="button" onClick={() => props.downloadSepa(id)}>
                            <Icon class="mybtn-success" size={14} icon={fileO} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {props.showActionButtons && props.permissions.manageFinancial ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon class="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsSepasView);
