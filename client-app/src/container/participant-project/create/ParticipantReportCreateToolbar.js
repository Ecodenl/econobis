import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

// Functionele wrapper voor de class component
const ParticipantReportCreateToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ParticipantReportCreateToolbar {...props} navigate={navigate} />;
};

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
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        {this.props.amountOfParticipants > 0 && (
                            <ButtonText
                                buttonText={'Rapportage versturen'}
                                onClickAction={() => {
                                    this.props.createParticipantReports();
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Rapportage aanmaken ({this.props.amountOfParticipants})</h4>
                    {this.props.showOnPortal ? (
                        <div className="text-center text-success">
                            Deze rapportage zal ook beschikbaar/zichtbaar worden op de Portal
                        </div>
                    ) : (
                        <div className="text-center text-danger">
                            Deze rapportage zal NIET beschikbaar/zichtbaar worden op de Portal
                        </div>
                    )}
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

export default ParticipantReportCreateToolbarWrapper;
