import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from "../../../components/button/ButtonText";

class ParticipantReportCreateToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {this.props.amountOfParticipants > 0 && (
                            <React.Fragment>
                            <ButtonText buttonText={'Rapportage versturen'} onClickAction={() => {this.props.createParticipantReports()}} />
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Rapportage aanmaken({this.props.amountOfParticipants})</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

export default ParticipantReportCreateToolbar;
