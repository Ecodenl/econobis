import React from 'react';

import { connect } from 'react-redux';
import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const RevenuesListForm = ({ projectTypeCodeRef }) => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">
                    {projectTypeCodeRef === 'postalcode_link_capital'
                        ? 'Deelname in opbrengsten Euro'
                        : 'Deelname in opbrengsten'}
                </span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuesListFormList />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project.typeCodeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
