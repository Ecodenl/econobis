import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import DocumentsList from './DocumentsList';

const DocumentHarmonica = ({
    title,
    toggleShowList,
    showDocumentsList,
    newDocument,
    documentCount,
    permissions,
    relatedDocuments,
}) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span>
                        {title} <span className="badge">{documentCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    {permissions.createDocument && (
                        <div className="pull-right">
                            <span
                                className="glyphicon glyphicon-plus glyphicon-white"
                                data-toggle="dropdown"
                                role="button"
                            />
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
                {showDocumentsList && <DocumentsList relatedDocuments={relatedDocuments} />}
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(DocumentHarmonica);
