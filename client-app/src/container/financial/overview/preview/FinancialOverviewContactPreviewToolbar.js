import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';

class FinancialOverviewContactPreviewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const status =
            this.props.financialOverviewContactDetails &&
            this.props.financialOverviewContactDetails.financialOverviewContact &&
            this.props.financialOverviewContactDetails.financialOverviewContact.status_id == 'concept'
                ? 'text-danger'
                : '';

        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
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

                        {/*{'Status: ' +*/}
                        {/*    (this.props.financialOverviewContactDetails &&*/}
                        {/*    this.props.financialOverviewContactDetails.financialOverviewContact*/}
                        {/*        ? this.props.financialOverviewContactDetails.financialOverviewContact.status !=*/}
                        {/*          'Concept'*/}
                        {/*            ? this.props.financialOverviewContactDetails.financialOverviewContact.status*/}
                        {/*            : '<span style="color: #ff0000">' +*/}
                        {/*              this.props.financialOverviewContactDetails.financialOverviewContact.status +*/}
                        {/*              '</span>'*/}
                        {/*        : '')}*/}

                        <span class={status}>
                            {'Status: ' +
                                (this.props.financialOverviewContactDetails &&
                                this.props.financialOverviewContactDetails.financialOverviewContact
                                    ? this.props.financialOverviewContactDetails.financialOverviewContact.status
                                    : '')}
                        </span>
                    </h4>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default FinancialOverviewContactPreviewToolbar;
