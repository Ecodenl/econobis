import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const FinancialOverviewContactViewToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewContactViewToolbar {...props} navigate={navigate} />;
};

class FinancialOverviewContactViewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                        <ButtonIcon iconName={'download'} onClickAction={this.props.download} />
                        <ButtonIcon iconName={'searchPlus'} onClickAction={this.props.zoomIn} />
                        <ButtonIcon iconName={'searchMinus'} onClickAction={this.props.zoomOut} />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center">
                        {'Contact: ' +
                            (this.props.financialOverviewContactDetails &&
                            this.props.financialOverviewContactDetails.financialOverviewContact &&
                            this.props.financialOverviewContactDetails.financialOverviewContact.contact
                                ? this.props.financialOverviewContactDetails.financialOverviewContact.contact.full_name
                                : '')}
                        <br />
                        {'Waardestaat: ' +
                            (this.props.financialOverviewContactDetails &&
                            this.props.financialOverviewContactDetails.financialOverviewContact &&
                            this.props.financialOverviewContactDetails.financialOverviewContact.financial_overview
                                ? this.props.financialOverviewContactDetails.financialOverviewContact.financial_overview
                                      .description
                                : '')}
                        <br />
                        {'Status: ' +
                            (this.props.financialOverviewContactDetails &&
                            this.props.financialOverviewContactDetails.financialOverviewContact
                                ? this.props.financialOverviewContactDetails.financialOverviewContact.status
                                : '')}
                    </h4>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default FinancialOverviewContactViewToolbarWrapper;
