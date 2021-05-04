import React from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

// todo: wm moet hier nog wat met revenueKwhSplit ?

const RevenuesListForm = ({
    permissions,
    projectId,
    participationId,
    projectStatus,
    projectType,
    projectRevenues,
    projectRevenueCategories,
    participantProjectDetails,
}) => {
    // todo: WM opschonen
    // console.log('participantProjectDetails: ');
    // console.log(participantProjectDetails);
    let disabled = false;
    let isRevenueKwhSplit = false;
    let revenueDisabledEuro = false;
    let revenueDisabledKwh = false;
    let revenueDisabledKwhSplit = false;
    let redemptionDisabledEuro = false;
    let revenueTitleEuro = 'Nieuwe opbrengst Euro verdeling maken';
    let revenueTitleKwh = 'Nieuwe opbrengst Kwh verdeling maken';
    let revenueTitleKwhSplit = 'Nieuwe tussentijdse (deelnemer) opbrengst Kwh verdeling maken';
    let redemptionTitleEuro = 'Nieuwe aflossing Euro verdeling maken';
    let hrefNewRevenueEuro = '';
    let hrefNewRevenueKwh = '';
    let hrefNewRedemptionEuro = '';
    let hrefNewRevenueKwhSplit = '';

    if (participationId && participationId > 0) {
        isRevenueKwhSplit = true;
    }
    if (projectStatus.codeRef !== 'active') {
        disabled = true;
    }

    if (isRevenueKwhSplit) {
        revenueDisabledEuro = true;
        revenueDisabledKwh = true;

        if (projectStatus.codeRef !== 'active') {
            revenueTitleKwhSplit =
                'Tussentijdse (deelnemer) opbrengst verdeling kan alleen bij status actief worden toegevoegd';
        }

        const revenueKwhSplitCategoryId = projectRevenueCategories.find(
            projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwhSplit'
        ).id;

        hrefNewRevenueKwhSplit = `/project/deelnemer/${participationId}/opbrengst/nieuw/${projectId}/${revenueKwhSplitCategoryId}`;

        projectRevenues.map(projectRevenue => {
            if (projectRevenue.categoryId == revenueKwhSplitCategoryId && projectRevenue.confirmed == 0) {
                revenueDisabledKwhSplit = true;
                revenueTitleKwhSplit = 'Lopende tussentijdse (deelnemer) kwh opbrengst verdeling al actief';
            }
        });
    } else {
        if (projectStatus.codeRef !== 'active') {
            revenueTitleEuro = 'Opbrengst verdeling kan alleen bij status actief worden toegevoegd';
            revenueTitleKwh = 'Opbrengst verdeling Kwh kan alleen bij status actief worden toegevoegd';
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

        hrefNewRevenueEuro = `/project/opbrengst/nieuw/${projectId}/${revenueEuroCategoryId}`;
        hrefNewRevenueKwh = `/project/opbrengst/nieuw/${projectId}/${revenueKwhCategoryId}`;
        hrefNewRedemptionEuro = `/project/opbrengst/nieuw/${projectId}/${redemptionEuroCategoryId}`;

        projectRevenues.map(projectRevenue => {
            if (projectRevenue.categoryId == revenueEuroCategoryId && projectRevenue.confirmed == 0) {
                revenueDisabledEuro = true;
                revenueTitleEuro = 'Lopende euro opbrengst verdeling al actief';
            }

            if (projectRevenue.categoryId == revenueKwhCategoryId && projectRevenue.confirmed == 0) {
                revenueDisabledKwh = true;
                revenueTitleKwh = 'Lopende kwh opbrengst verdeling al actief';
            }

            if (projectRevenue.categoryId == redemptionEuroCategoryId && projectRevenue.confirmed == 0) {
                redemptionDisabledEuro = true;
                redemptionTitleEuro = 'Lopende euro aflossing verdeling al actief';
            }
        });
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Opbrengsten</span>
                {permissions.manageFinancial && (
                    <React.Fragment>
                        {projectType.codeRef === 'capital' ? (
                            <ButtonIcon
                                buttonClassName={'pull-right btn btn-link'}
                                onClickAction={() => hashHistory.push({ hrefNewRevenueEuro })}
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
                                    {isRevenueKwhSplit ? (
                                        <li className={disabled || revenueDisabledKwhSplit ? 'disabled' : null}>
                                            {disabled || revenueDisabledKwhSplit ? (
                                                <a role={'button'} title={revenueTitleKwhSplit} onClick={() => {}}>
                                                    Tussentijdse opbrengst Kwh
                                                </a>
                                            ) : (
                                                <a
                                                    role={'button'}
                                                    title={revenueTitleKwhSplit}
                                                    onClick={() => hashHistory.push({ hrefNewRevenueKwhSplit })}
                                                >
                                                    Tussentijdse opbrengst Kwh
                                                </a>
                                            )}
                                        </li>
                                    ) : (
                                        <>
                                            <li className={disabled || revenueDisabledEuro ? 'disabled' : null}>
                                                {disabled || revenueDisabledEuro ? (
                                                    <a role={'button'} title={revenueTitleEuro} onClick={() => {}}>
                                                        Opbrengst Euro
                                                    </a>
                                                ) : (
                                                    <a
                                                        role={'button'}
                                                        title={revenueTitleEuro}
                                                        onClick={() => hashHistory.push({ hrefNewRevenueEuro })}
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
                                                        onClick={() => hashHistory.push({ hrefNewRevenueKwh })}
                                                    >
                                                        Opbrengst Kwh
                                                    </a>
                                                )}
                                            </li>
                                        </>
                                    )}
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
                                                onClick={() => hashHistory.push({ hrefNewRevenueEuro })}
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
                                                onClick={() => hashHistory.push({ hrefNewRedemptionEuro })}
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
    //todo: WM opschonen
    // console.log('RevenuesListForm - state');
    // console.log(state);
    return {
        permissions: state.meDetails.permissions,
        projectStatus: state.projectDetails.projectStatus,
        projectRevenues: state.projectDetails.revenues,
        projectType: state.projectDetails.projectType,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
        participantProjectDetails: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
