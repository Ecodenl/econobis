import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import { hashHistory } from 'react-router';
import ButtonText from '../../../../components/button/ButtonText';

const ParticipantsListToolbar = props => {
    const { meta = {} } = props.participantsProject;

    return (
        <div className="row">
            <div className="col-md-2">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetParticipantProjectFilters} />
                    {props.permissions.manageParticipation && (
                        <ButtonIcon
                            iconName={'glyphicon-plus'}
                            onClickAction={() => hashHistory.push(`/project/deelnemer/nieuw/${props.project.id}`)}
                            disabled={props.project.projectStatus.codeRef !== 'active'}
                            title={
                                props.project.projectStatus.codeRef !== 'active'
                                    ? 'Deelnemer kan alleen bij status actief worden toegevoegd'
                                    : 'Deelnemer toevoegen'
                            }
                        />
                    )}
                    <ButtonIcon iconName={'glyphicon-filter'} onClickAction={props.toggleShowExtraFilters} />
                    <ButtonIcon
                        iconName={'glyphicon-download-alt'}
                        title="Download deelnemers met mutaties"
                        onClickAction={props.getExcel}
                    />
                    <ButtonIcon
                        iconName={'glyphicon-download-alt'}
                        title="Download deelnemers"
                        onClickAction={props.getExcelParticipants}
                    />
                    <ButtonText buttonText={'Rapportage'} onClickAction={props.toggleShowCheckboxList} />
                </div>
            </div>
            <div className="col-md-8">
                <h4 className="text-center table-title">
                    Deelnemers project {props.project ? props.project.name : ''}
                </h4>
            </div>
            <div className="col-md-2">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantsProject: state.participantsProject.list,
        project: state.projectDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ParticipantsListToolbar);
