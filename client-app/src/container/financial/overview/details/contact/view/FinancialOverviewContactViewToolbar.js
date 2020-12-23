import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';

class FinancialOverviewContactViewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-download-alt'} onClickAction={this.props.download} />
                        <ButtonIcon iconName={'glyphicon-zoom-in'} onClickAction={this.props.zoomIn} />
                        <ButtonIcon iconName={'glyphicon-zoom-out'} onClickAction={this.props.zoomOut} />
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

export default FinancialOverviewContactViewToolbar;
