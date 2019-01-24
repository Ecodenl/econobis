import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const DocumentsListToolbar = props => {
    const newDocument = type => {
        hashHistory.push(`document/nieuw/${type}`);
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.documents;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetDocumentsFilters} />
                    {permissions.createDocument && (
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-plus" />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="btn" onClick={() => newDocument('internal')}>
                                        Maak document
                                    </a>
                                </li>
                                <li>
                                    <a className="btn" onClick={() => newDocument('upload')}>
                                        Upload document
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Documenten</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        documents: state.documents.list,
    };
};

export default connect(mapStateToProps)(DocumentsListToolbar);
