import React from 'react';

import RevenuesKwhListFormList from './RevenuesKwhListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

const RevenuesKwhListForm = ({ permissions, projectId, projectStatus, revenuesKwh, projectRevenueCategories }) => {
    const navigate = useNavigate();

    let disabled = false;
    let revenueDisabledKwh = false;
    let revenueTitleKwh = 'Nieuwe opbrengst Kwh verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        revenueTitleKwh = 'Opbrengst verdeling kan alleen bij projectstatus actief worden toegevoegd';
    }

    const revenueKwhCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwh'
    ).id;

    revenuesKwh.map(projectRevenue => {
        if (projectRevenue.categoryId == revenueKwhCategoryId) {
            if (projectRevenue.confirmed == 0) {
                revenueDisabledKwh = true;
                revenueTitleKwh = 'Lopende kwh opbrengstverdeling al actief';
            }
        }
    });

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten Kwh</span>
                {permissions.manageProject && (
                    <React.Fragment>
                        <ButtonIcon
                            buttonClassName={'pull-right btn btn-link'}
                            onClickAction={() =>
                                navigate(`/project/opbrengst-kwh/nieuw/${projectId}/${revenueKwhCategoryId}`)
                            }
                            disabled={disabled || revenueDisabledKwh}
                            title={revenueTitleKwh}
                            iconName={'plus'}
                        />
                    </React.Fragment>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RevenuesKwhListFormList />
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectStatus: state.projectDetails.projectStatus,
        revenuesKwh: state.projectDetails.revenuesKwh,
        projectType: state.projectDetails.projectType,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

export default connect(mapStateToProps)(RevenuesKwhListForm);
