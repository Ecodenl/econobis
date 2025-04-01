import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuotationRequestStatusDetailsFormGeneralEdit from './QuotationRequestStatusDetailsFormGeneralEdit';
import QuotationRequestStatusDetailsFormGeneralView from './QuotationRequestStatusDetailsFormGeneralView';

class QuotationRequestStatusDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        const explanationWf = (
            <span>
                Als gebruik workflow bij deze status is aangezet, dan zal er automatisch eenmalig een e-mail verstuurd
                gaan worden naar contact en/of coach (verzoek voor bewoner) als kansactie op deze status is gezet.
                <br />
                De verzenddatum wordt dan bepaald, rekening houdend met het opgegeven aantal dagen.
                <br />
                Bij aantal dagen 0 zal de e-mail direct verzonden worden.
            </span>
        );

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <QuotationRequestStatusDetailsFormGeneralEdit
                        quotationRequestStatus={this.props.quotationRequestStatus}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                        explanationWf={explanationWf}
                    />
                ) : (
                    <QuotationRequestStatusDetailsFormGeneralView
                        {...this.props.quotationRequestStatus}
                        switchToEdit={this.switchToEdit}
                        explanationWf={explanationWf}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(QuotationRequestStatusDetailsFormGeneral);
