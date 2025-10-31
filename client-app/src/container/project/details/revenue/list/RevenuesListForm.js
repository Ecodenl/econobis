import React from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const RevenuesListForm = ({
    permissions,
    projectId,
    projectStatus,
    projectType,
    projectRevenues,
    projectRevenueCategories,
}) => {
    const navigate = useNavigate();

    let disabled = false;
    let revenueDisabledEuro = false;
    let redemptionDisabledEuro = false;
    let revenueTitleEuro = 'Nieuwe opbrengst Euro verdeling maken';
    let redemptionTitleEuro = 'Nieuwe aflossing Euro verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        revenueTitleEuro = 'Opbrengst verdeling kan alleen bij projectstatus actief worden toegevoegd';
        redemptionTitleEuro = 'Aflossing verdeling kan alleen bij projectstatus actief worden toegevoegd';
    }

    const revenueEuroCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueEuro'
    ).id;
    const redemptionEuroCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'redemptionEuro'
    ).id;

    projectRevenues.map(projectRevenue => {
        if (projectRevenue.categoryId == revenueEuroCategoryId && projectRevenue.confirmed == 0) {
            revenueDisabledEuro = true;
            revenueTitleEuro = 'Lopende euro opbrengstverdeling al actief';
        }

        if (projectRevenue.categoryId == redemptionEuroCategoryId && projectRevenue.confirmed == 0) {
            redemptionDisabledEuro = true;
            redemptionTitleEuro = 'Lopende euro aflossingsverdeling al actief';
        }
    });

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">
                    {projectType.codeRef === 'postalcode_link_capital' ? 'Opbrengsten Euro' : 'Opbrengsten'}
                </span>
                {permissions.manageProject && (
                    <React.Fragment>
                        {projectType.codeRef === 'capital' || projectType.codeRef === 'postalcode_link_capital' ? (
                            <ButtonIcon
                                buttonClassName={'pull-right btn btn-link'}
                                onClickAction={() =>
                                    navigate(`/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`)
                                }
                                disabled={disabled || revenueDisabledEuro}
                                title={revenueTitleEuro}
                                iconName={'plus'}
                            />
                        ) : (
                            ''
                        )}

                        {projectType.codeRef === 'loan' || projectType.codeRef === 'obligation' ? (
                            <div className="nav navbar-nav btn-group pull-right" role="group">
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <Icon size={14} icon={plus} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li className={disabled || revenueDisabledEuro ? 'disabled' : null}>
                                        {disabled || revenueDisabledEuro ? (
                                            <a role={'button'} title={revenueTitleEuro} onClick={() => {}}>
                                                Opbrengst Euro
                                            </a>
                                        ) : (
                                            <a
                                                role={'button'}
                                                title={revenueTitleEuro}
                                                onClick={() =>
                                                    navigate(
                                                        `/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`
                                                    )
                                                }
                                            >
                                                Opbrengst Euro
                                            </a>
                                        )}
                                    </li>
                                    <li className={disabled || redemptionDisabledEuro ? 'disabled' : null}>
                                        {disabled || redemptionDisabledEuro ? (
                                            <a role={'button'} title={redemptionTitleEuro} onClick={() => {}}>
                                                Aflossing Euro
                                            </a>
                                        ) : (
                                            <a
                                                role={'button'}
                                                title={redemptionTitleEuro}
                                                onClick={() =>
                                                    navigate(
                                                        `/project/opbrengst/nieuw/${projectId}/${redemptionEuroCategoryId}`
                                                    )
                                                }
                                            >
                                                Aflossing Euro
                                            </a>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            ''
                        )}
                    </React.Fragment>
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
        projectType: state.projectDetails.projectType,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
