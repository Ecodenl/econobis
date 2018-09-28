import React from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import moment from "moment";

const WebformDetailsFormGeneralView = props => {
    const { name, apiKey, apiKeyDate, maxRequestsPerMinute, dateStart, dateEnd, responsibleUser, responsibleTeam } = props.webformDetails;

    return (
        <div>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <div className='col-sm-6' onClick={props.switchToEdit}>
                            <label className="col-sm-6">Naam</label>
                            <div className="col-sm-6">
                                {name}
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <label className="col-sm-6" onClick={props.switchToEdit}>Sleutel</label>
                            <div className="col-sm-6" style={{paddingRight: '5px'}} onClick={null}>
                                {apiKey}
                                <CopyToClipboard text={apiKey}>
                                    <span className="glyphicon glyphicon-copy mybtn-success pull-right" style={{top: '5px'}} role="button" onClick={null} title={'Kopieer sleutel'} />
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={"Aanvragen per minuut?"}
                            value={maxRequestsPerMinute}
                        />
                        <ViewText
                            label={"Datum sleutel"}
                            value={apiKeyDate && moment(apiKeyDate.date).format('L')}
                        />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={"Startdatum"}
                            value={dateStart && moment(dateStart.date).format('L')}
                        />
                        <ViewText
                            label={"Einddatum"}
                            value={dateEnd && moment(dateEnd.date).format('L')}
                        />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
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