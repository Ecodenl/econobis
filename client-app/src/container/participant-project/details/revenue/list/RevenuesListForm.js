import React from 'react';

import RevenuesListFormList from './RevenuesListFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';

const RevenuesListForm = ({
    permissions,
    projectId,
    participationId,
    projectStatus,
    participantProjectRevenues,
    projectRevenueCategories,
    participantProjectDetails,
}) => {
    const revenueKwhSplitCategoryId = projectRevenueCategories.find(
        projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwhSplit'
    ).id;

    let disabled = false;
    let revenueDisabledKwhSplit = false;
    let revenueTitleKwhSplit = 'Nieuwe tussentijdse (deelnemer) opbrengst Kwh verdeling maken';

    if (projectStatus.codeRef !== 'active') {
        disabled = true;
        revenueTitleKwhSplit =
            'Tussentijdse (deelnemer) opbrengst verdeling kan alleen bij projectstatus actief worden toegevoegd';
    } else {
        participantProjectRevenues.map(participantProjectRevenue => {
            if (
                participantProjectRevenue.categoryId == revenueKwhSplitCategoryId &&
                participantProjectRevenue.confirmed == 0
            ) {
                revenueDisabledKwhSplit = true;
                revenueTitleKwhSplit = 'Lopende tussentijdse (deelnemer) kwh opbrengst verdeling al actief';
            }
        });
    }
    const showNewRevenueKwhSplit =
        participantProjectDetails &&
        participantProjectDetails.dateBeginNextRevenueKwh !== null &&
        participantProjectDetails.dateEndNextRevenueKwh !== null;

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Tussentijdse opbrengsten</span>
                {permissions.manageFinancial && (
                    <React.Fragment>
                        <div className="nav navbar-nav btn-group pull-right" role="group">
                            {showNewRevenueKwhSplit && (
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <span className="glyphicon glyphicon-plus" />
                                </button>
                            )}
                            <ul className="dropdown-menu">
                                <li className={disabled || revenueDisabledKwhSplit ? 'disabled' : null}>
                                    {disabled || revenueDisabledKwhSplit ? (
                                        <a role={'button'} title={revenueTitleKwhSplit} onClick={() => {}}>
                                            Tussentijdse opbrengst Kwh
                                        </a>
                                    ) : (
                                        <a
                                            role={'button'}
                                            title={revenueTitleKwhSplit}
                                            onClick={() =>
                                                hashHistory.push(
                                                    `/project/deelnemer/opbrengst/nieuw/${projectId}/${participationId}/${revenueKwhSplitCategoryId}`
                                                )
                                            }
                                        >
                                            Tussentijdse opbrengst Kwh
                                        </a>
                                    )}
                                </li>
                            </ul>
                        </div>
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
        participantProjectRevenues: state.participantProjectDetails.revenues,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
        projectStatus: state.projectDetails.projectStatus,
        participantProjectDetails: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(RevenuesListForm);
