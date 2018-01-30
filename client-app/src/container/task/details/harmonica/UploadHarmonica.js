import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import UploadsList from './UploadsList';
import UploadFileModal from './UploadFileModal';

const UploadHarmonica = ({toggleShowList, showUploadsList, toggleUploadfile, showModalUploadfile, attachmentCount, id, permissions}) => {
    return (
        <div>
            <Panel className="harmonica-button">
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span>UPLOADS <span className="badge">{ attachmentCount }</span></span>
                    </div>
                    <div className={"col-sm-2"}>
                        {permissions.manageTask &&
                        <a role="button" className="pull-right" onClick={toggleUploadfile}><span
                            className="glyphicon glyphicon-plus glyphicon-white"/></a>
                        }
                    </div>
                    <div className="col-sm-12">
                        { showUploadsList && <UploadsList /> }
                    </div>
                </PanelBody>
            </Panel>

            { showModalUploadfile &&
            <UploadFileModal toggleUploadfile={toggleUploadfile} id={id} />
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(UploadHarmonica);