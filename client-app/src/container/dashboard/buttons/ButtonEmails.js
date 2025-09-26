import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';

// Functionele wrapper voor de class component
const ButtonEmailsWrapper = props => {
    const navigate = useNavigate();
    return <ButtonEmails {...props} navigate={navigate} />;
};

class ButtonEmails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOpenEmails: '-',
        };
    }

    UNSAFE_componentWillMount() {
        EmailGenericAPI.getAmountOpen().then(payload => {
            this.setState({
                amountOpenEmails: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size} onClick={() => this.props.navigate(`/mailclient/inbox`)}>
                <div className="panel panel-default" id="dashboardbutton-1">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">E-MAIL</h4>
                        <h4 className="text-center text-bold">{this.state.amountOpenEmails}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonEmailsWrapper;
