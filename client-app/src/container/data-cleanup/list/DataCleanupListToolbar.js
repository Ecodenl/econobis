import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

const DataCleanupListToolbar = props => {
    return (
        <div className="row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-2">
                <a role="button" onClick={() => props.handleRefresh()} title={`herbereken alle op te schonen`}>
                    <Icon size={14} icon={refresh} />
                </a>
            </div>
            <div className="col-sm-6">
                <h3 className="text-center table-title">Opschonen {props.title()}</h3>
            </div>
            <div className="col-sm-2">
            </div>
            <div className="col-sm-1">
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps)(DataCleanupListToolbar);
