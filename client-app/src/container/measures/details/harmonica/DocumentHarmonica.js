import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import DocumentsList from './DocumentsList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const DocumentHarmonica = ({ toggleShowList, showDocumentsList, newDocument, documentCount, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span>
                        DOCUMENTEN <span className="badge">{documentCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    {permissions.createDocument && (
                        <div className="pull-right">
                            <Icon class="harmonica-button" size={14} icon={plus} data-toggle="dropdown" role="button"/>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="btn" onClick={() => newDocument('upload')}>
                                        Upload document
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="col-sm-12">{showDocumentsList && <DocumentsList />}</div>
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
