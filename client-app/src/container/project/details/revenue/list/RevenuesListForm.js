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
    let disabledEuro = false;
    let disabledKwh = false;
    let title = 'Nieuwe opbrengst verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        title = 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd';
    }

    const revenueEuroCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueEuro'
    ).id;
    const revenueKwhCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwh'
    ).id;

    projectRevenues.map(projectRevenue => {
        if (projectRevenue.confirmed == 0 && projectRevenue.categoryId == revenueEuroCategoryId) {
            disabledEuro = true;
            title = 'Lopende opbrengst verdeling al actief';
        }

        if (projectRevenue.confirmed == 0 && projectRevenue.categoryId == revenueKwhCategoryId) {
            disabledKwh = true;
            title = 'Lopende opbrengst verdeling al actief';
        }
    });

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten</span>
                {permissions.manageFinancial && (
                    <React.Fragment>
                        {projectType.codeRef === 'postalcode_link_capital' ? (
                            <div className="nav navbar-nav btn-group pull-right" role="group">
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <span className="glyphicon glyphicon-plus" />
                                </button>
                                <ul className="dropdown-menu">
                                    <li className={disabled || disabledEuro ? 'disabled' : null}>
                                        {disabled || disabledEuro ? (
                                            <a role={'button'} title={title} onClick={() => {}}>
                                                Opbrengst Euro
                                            </a>
                                        ) : (
                                            <a
                                                role={'button'}
                                                title={title}
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
                                    <li className={disabled || disabledKwh ? 'disabled' : null}>
                                        {disabled || disabledEuro ? (
                                            <a role={'button'} title={title} onClick={() => {}}>
                                                Opbrengst Kwh
                                            </a>
                                        ) : (
                                            <a
                                                role={'button'}
                                                title={title}
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
                            <ButtonIcon
                                buttonClassName={'pull-right btn btn-link'}
                                onClickAction={() =>
                                    hashHistory.push(`/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`)
                                }
                                disabled={disabled || disabledEuro}
                                title={title}
                                iconName={'glyphicon-plus'}
                            />
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
