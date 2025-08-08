import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import { useNavigate } from 'react-router-dom';
import InputDate from '../../../../components/form/InputDate';
import validator from 'validator';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import { setError } from '../../../../actions/general/ErrorActions';

// Functionele wrapper voor de class component
const InvoiceListSendWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceListSend {...props} navigate={navigate} />;
};

class InvoiceListSend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateCollection: '',
            errors: {
                dateCollection: false,
            },
        };
    }

    confirmAction = event => {
        event.preventDefault();

        if (!this.props.canCreateInvoices['can']) {
            this.props.setError(412, this.props.canCreateInvoices['message']);
            this.props.closeModal();
            return;
        }

        let hasErrors = false;

        if (this.props.paymentType === 'collection') {
            const { dateCollection } = this.state;

            // Validation
            let errors = {};

            if (validator.isEmpty(dateCollection + '')) {
                errors.dateCollection = true;
                hasErrors = true;
            }

            if (moment().isAfter(moment(dateCollection))) {
                errors.dateCollection = true;
                hasErrors = true;
            }

            this.setState({ ...this.state, errors: errors });

            if (!hasErrors) {
                InvoiceDetailsAPI.sendAll([this.props.invoiceId], dateCollection).then(payload => {
                    this.props.navigate(`/financieel/${this.props.administrationId}/notas/verzonden`);
                });
            }
        } else {
            InvoiceDetailsAPI.sendAll([this.props.invoiceId], null).then(payload => {
                this.props.navigate(`/financieel/${this.props.administrationId}/notas/verzonden`);
            });
        }
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    render() {
        const { dateCollection } = this.state;

        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Nota verzenden"
                buttonConfirmText={'Verzenden'}
            >
                {this.props.paymentType === 'collection' && (
                    <div className="row">
                        <InputDate
                            divSize={'col-xs-12'}
                            label="Incasso datum"
                            name="dateCollection"
                            value={dateCollection}
                            onChangeAction={this.handleInputChangeDate}
                            required={'required'}
                            error={this.state.errors.dateCollection}
                        />
                    </div>
                )}
                {this.props.paymentType === 'collection' && (
                    <div className="row">
                        <div className={'col-sm-12 margin-10-bottom'}>
                            <span>
                                De incasso datum moet minimaal x dagen later zijn dan de datum waarop je het sepa
                                incasso bestand upload bij je bank. En maximaal x maanden na de upload datum. Informeer
                                bij jou bank welke data zij handhaven.
                                <br />
                                <br />
                                <ul>
                                    <li>Bij Triodos is dat minimaal 2 werkdagen en maximaal 2 maanden</li>
                                </ul>
                            </span>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u deze nota verzenden?</span>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        canCreateInvoices: state.administrationDetails.canCreateInvoices,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceListSendWrapper);
