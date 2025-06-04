import React from 'react';
import { connect } from 'react-redux';

const DataCleanupListToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Opschonen {props.title()}</h3>
            </div>
            <div className="col-md-4">
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps)(DataCleanupListToolbar);
