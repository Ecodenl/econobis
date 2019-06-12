import React from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

const RevenuesListForm = ({ permissions, projectId, projectStatus, projectRevenues }) => {
    let disabled = false;
    let title = 'Nieuwe opbrengst verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        title = 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd';
    }

    projectRevenues.map(projectRevenue => {
        if (projectRevenue.confirmed == 0) {
            disabled = true;
            title = 'Lopende opbrengst verdeling al actief';
        }
    });

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten</span>
                {permissions.manageFinancial && (
                    <ButtonIcon
                        buttonClassName={'pull-right btn btn-link'}
                        onClickAction={() => hashHistory.push(`/project/opbrengst/nieuw/${projectId}`)}
                        disabled={disabled}
                        title={title}
                        iconName={'glyphicon-plus'}
                    />
                )}
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
        permissions: state.meDetails.permissions,
        projectStatus: state.projectDetails.projectStatus,
        projectRevenues: state.projectDetails.revenues,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
