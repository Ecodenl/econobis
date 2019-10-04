import React from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

const RevenuesListForm = ({
    permissions,
    projectId,
    projectStatus,
    projectType,
    projectRevenues,
    projectRevenueCategories,
}) => {
    let disabled = false;
    let revenueDisabledEuro = false;
    let revenueDisabledKwh = false;
    let redemptionDisabledEuro = false;
    let revenueTitleEuro = 'Nieuwe opbrengst Euro verdeling maken';
    let revenueTitleKwh = 'Nieuwe opbrengst Kwh verdeling maken';
    let redemptionTitleEuro = 'Nieuwe aflossing Euro verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        revenueTitleEuro = 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd';
        revenueTitleKwh = 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd';
        redemptionTitleEuro = 'Aflossing verdeling kan alleen bij status actief worden toegevoegd';
    }

    const revenueEuroCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueEuro'
    ).id;
    const revenueKwhCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwh'
    ).id;
    const redemptionEuroCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'redemptionEuro'
    ).id;

    projectRevenues.map(projectRevenue => {
        if (projectRevenue.categoryId == revenueEuroCategoryId && projectRevenue.confirmed == 0) {
            revenueDisabledEuro = true;
            revenueTitleEuro = 'Lopende euro opbrengst verdeling al actief';
        }

        if (projectRevenue.categoryId == revenueKwhCategoryId && projectRevenue.confirmed == 0) {
            revenueDisabledKwh = true;
            revenueTitleKwh = 'Lopende kwh opbrengst is verdeling al actief';
        }

        if (projectRevenue.categoryId == redemptionEuroCategoryId && projectRevenue.confirmed == 0) {
            redemptionDisabledEuro = true;
            redemptionTitleEuro = 'Lopende euro aflossing verdeling al actief';
        }
    });

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten</span>
                {permissions.manageFinancial && (
                    <React.Fragment>
                        {projectType.codeRef === 'capital' ? (
                            <ButtonIcon
                                buttonClassName={'pull-right btn btn-link'}
                                onClickAction={() =>
                                    hashHistory.push(`/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`)
                                }
                                disabled={disabled || revenueDisabledEuro}
                                title={revenueTitleEuro}
                                iconName={'glyphicon-plus'}
                            />
                        ) : (
                            ''
                        )}

                        {projectType.codeRef === 'postalcode_link_capital' ? (
                            <div className="nav navbar-nav btn-group pull-right" role="group">
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <span className="glyphicon glyphicon-plus" />
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
                                                    hashHistory.push(
                                                        `/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`
                                                    )
                                                }
                                            >
                                                Opbrengst Euro
                                            </a>
                                        )}
                                    </li>
                                    <li className={disabled || revenueDisabledKwh ? 'disabled' : null}>
                                        {disabled || revenueDisabledKwh ? (
                                            <a role={'button'} title={revenueTitleKwh} onClick={() => {}}>
                                                Opbrengst Kwh
                                            </a>
                                        ) : (
                                            <a
                                                role={'button'}
                                                title={revenueTitleKwh}
                                                onClick={() =>
                                                    hashHistory.push(
                                                        `/project/opbrengst/nieuw/${projectId}/${revenueKwhCategoryId}`
                                                    )
                                                }
                                            >
                                                Opbrengst Kwh
                                            </a>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            ''
                        )}

                        {projectType.codeRef === 'loan' || projectType.codeRef === 'obligation' ? (
                            <div className="nav navbar-nav btn-group pull-right" role="group">
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <span className="glyphicon glyphicon-plus" />
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
                                                    hashHistory.push(
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
                                                    hashHistory.push(
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
