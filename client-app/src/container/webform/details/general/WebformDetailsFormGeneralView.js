import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import moment from "moment";

const WebformDetailsFormGeneralView = props => {
    const { name, apiKey, maxRequestsPerMinute, dateStart, dateEnd, responsibleUser, responsibleTeam } = props.webformDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Naam"}
                            value={name}
                        />
                        <ViewText
                            label={"Sleutel"}
                            value={apiKey}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Startdatum"}
                            value={dateStart && moment(dateStart.date).format('L')}
                        />
                        <ViewText
                            label={"Einddatum"}
                            value={dateEnd && moment(dateEnd.date).format('L')}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Aanvragen per minuut?"}
                            value={maxRequestsPerMinute}
                        />
                        <ViewText
                            label={"Verantwoordelijke"}
                            value={responsibleUser ? responsibleUser.fullName : responsibleTeam.name}
                            link={responsibleUser ? 'gebruiker/' + responsibleUser.id : 'team/' + responsibleTeam.id}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        webformDetails: state.webformDetails,
    };
};

export default connect(mapStateToProps)(WebformDetailsFormGeneralView);