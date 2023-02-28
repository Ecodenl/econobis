import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

const ParticipantsListToolbar = props => {
    const { meta = {} } = props.participantsProject;

    return (
        <div className="row">
            <div className="col-md-2">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName="refresh" onClickAction={props.resetParticipantProjectFilters} />
                    {/*Filter hier voorlopig even uitgezet op verzoek*/}
                    {/*<ButtonIcon iconName="glyphicon-filter" onClickAction={props.toggleShowExtraFilters} />*/}
                    <ButtonIcon iconName="download" onClickAction={props.getExcel} />
                    <ButtonText buttonText="Rapportage" onClickAction={props.toggleShowCheckboxList} />
                </div>
            </div>
            <div className="col-md-8">
                <h4 className="text-center table-title">Deelnemers project</h4>
            </div>
            <div className="col-md-2">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    participantsProject: state.participantsProject.list,
    permissions: state.meDetails.permissions,
});

export default connect(mapStateToProps, null)(ParticipantsListToolbar);
