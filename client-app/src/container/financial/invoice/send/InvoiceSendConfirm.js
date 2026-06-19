import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import InputDate from '../../../../components/form/InputDate';
import validator from 'validator';
import moment from 'moment/moment';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';

// Functionele wrapper voor de class component
const InvoiceSendConfirmWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceSendConfirm {...props} navigate={navigate} />;
};

class InvoiceSendConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateCollection: '',
            loading: false,
            errors: {
                dateCollection: false,
            },
        };
    }

    confirmAction = event => {
        event.preventDefault();
        this.setState({
            loading: true,
        });

        if (!this.props.canCreateInvoices['can']) {
            this.props.setError(412, this.props.canCreateInvoices['message']);
            this.props.closeModal();
            return;
        }

        let hasErrors = false;

        if (this.props.paymentType === 'incasso') {
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
                InvoiceDetailsAPI.sendAll(this.props.invoiceIds, dateCollection).then(payload => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                });

                this.props.navigate(`/financieel/${this.props.administrationId}/notas/verzonden`);
            }
        } else {
            InvoiceDetailsAPI.sendAll(this.props.invoiceIds, null).then(payload => {
                if (payload && payload.headers && payload.headers['x-filename']) {
                    fileDownload(payload.data, payload.headers['x-filename']);
                }
            });

            this.props.navigate(`/financieel/${this.props.administrationId}/notas/verzonden`);
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
                title="Nota's verzenden"
                buttonConfirmText={'Verzenden'}
                loading={this.state.loading}
            >
                {this.props.paymentType === 'incasso' && (
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
                {this.props.paymentType === 'incasso' && (
                    <div className="row">
                        <div className={'col-sm-12 margin-10-bottom'}>
                            <span>
                                De incasso datum moet minimaal x dagen later zijn dan de datum waarop je het sepa
                                incasso bestand upload bij je bank. En maximaal x maanden na de upload datum. Informeer
                                bij jou bank welke data zij handhaven.
                                <br /> <br />
                                <ul>
                                    <li>Bij Triodos is dat minimaal 2 werkdagen en maximaal 2 maanden</li>
                                </ul>
                            </span>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u geselecteerde nota's definitief maken en verzenden?</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSendConfirmWrapper);
