import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";

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
            <div className={this.props.size} onClick={() => hashHistory.push(`/mailclient/inbox?eigen=1`)}>
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

export default ButtonEmails;
