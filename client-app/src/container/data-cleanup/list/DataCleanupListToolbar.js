import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';

const DataCleanupListToolbar = props => {
    return (
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-2">
                {props.dataCleanupType === 'items' ? (
                    <a
                        role="button"
                        onClick={() => props.handleDataCleanupUpdateAmounts('all')}
                        title={`herbereken alle op te schonen items`}
                    >
                        <Icon size={14} icon={refresh} />
                    </a>
                ) : null}
            </div>
            <div className="col-sm-6">
                <h3 className="text-center table-title">Opschonen {props.title()}</h3>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-1"></div>
        </div>
    );
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(DataCleanupListToolbar);
