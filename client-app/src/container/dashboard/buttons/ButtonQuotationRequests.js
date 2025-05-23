import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import QuotationRequestsAPI from '../../../api/quotation-request/QuotationRequestsAPI';

// Functionele wrapper voor de class component
const ButtonQuotationRequestsWrapper = props => {
    const navigate = useNavigate();
    return <ButtonQuotationRequests {...props} navigate={navigate} />;
};

class ButtonQuotationRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountActiveQuotationsRequests: '-',
        };
    }

    UNSAFE_componentWillMount() {
        QuotationRequestsAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveQuotationsRequests: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size} onClick={() => this.props.navigate(`/offerteverzoeken`)}>
                <div className="panel panel-default" id="dashboardbutton-5">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">Kansacties</h4>
                        <h4 className="text-center text-bold">{this.state.amountActiveQuotationsRequests}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonQuotationRequestsWrapper;
