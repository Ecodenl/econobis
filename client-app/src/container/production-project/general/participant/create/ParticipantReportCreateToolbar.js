import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../../components/button/ButtonIcon';

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
                            <ButtonIcon
                                iconName={'glyphicon-file'}
                                onClickAction={this.props.createParticipantReports}
                            />
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
