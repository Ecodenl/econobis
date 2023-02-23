import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';
import AdministrationDetailsAPI from '../../api/administration/AdministrationDetailsAPI';
import ButtonText from '../../components/button/ButtonText';
import { setError } from '../../actions/general/ErrorActions';
import moment from 'moment/moment';
import InvoicesSyncFromTwinfield from './InvoicesSyncFromTwinfield';

class FinancialToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            syncingToInvoices: false,
            syncingFromInvoices: false,
            showModalFromDateSent: false,
            fromDateSent: null,
            errors: {
                fromDateSent: false,
            },
        };
    }

    syncInvoicesToTwinfield = () => {
        this.setState({ syncingToInvoices: true });
        AdministrationDetailsAPI.syncSentInvoicesToTwinfield(this.props.administrationDetails.id)
            .then(payload => {
                this.setState({ syncingToInvoices: false });
                this.props.setError(200, payload.data);
                hashHistory.push(`/financieel/${this.props.administrationDetails.id}/notas/geexporteerd`);
            })
            .catch(error => {
                this.setState({ syncingToInvoices: false });
                console.log(error);
                this.props.setError(
                    500,
                    'Er is iets misgegaan met synchroniseren van de gegevens. ' +
                        'Mocht dit probleem zich blijven voordoen meld dit dan bij Econobis support. ' +
                        'Meld ons wanneer het voor het laatst fout is gegaan, voor welke administratie en bij welke synchroniseer actie. '
                );
                // alert('Er is iets misgegaan met synchroniseren van de gegevens. Probeer het later opnieuw');
            });
    };

    syncInvoicesFromTwinfield = () => {
        this.setState({
            ...this.state,
            showModalFromDateSent: false,
            syncingFromInvoices: true,
        });
        AdministrationDetailsAPI.syncSentInvoicesFromTwinfield(
            this.props.administrationDetails.id,
            this.state.fromDateSent
        )
            .then(payload => {
                this.setState({ ...this.state, syncingFromInvoices: false });
                this.props.setError(200, payload.data);
            })
            .catch(error => {
                this.setState({ ...this.state, syncingFromInvoices: false });
                console.log(error);
                this.props.setError(
                    500,
                    'Er is iets misgegaan met synchroniseren van de gegevens. ' +
                        'Mocht dit probleem zich blijven voordoen meld dit dan bij Econobis support. ' +
                        'Meld ons wanneer het voor het laatst fout is gegaan, voor welke administratie en bij welke synchroniseer actie. '
                );
                // alert('Er is iets misgegaan met synchroniseren van de gegevens. Probeer het later opnieuw');
            });
    };

    showModalFromDateSent = () => {
        this.setState({
            ...this.state,
            fromDateSent: this.props.administrationDetails.oldestUnpaidInvoiceDate
                ? moment(this.props.administrationDetails.oldestUnpaidInvoiceDate).format('Y-MM-DD')
                : moment().format('Y-MM-DD'),
            showModalFromDateSent: true,
        });
    };

    closeModalFromDateSent = showModalFromDateSent => {
        this.setState({
            ...this.state,
            showModalFromDateSent: false,
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <ButtonText
                                    loading={this.state.syncingToInvoices}
                                    loadText={'Aan het synchroniseren'}
                                    buttonText={
                                        <span>
                                            <span
                                                className="glyphicon glyphicon-refresh"
                                                title="Nota's naar Twinfield synchroniseren"
                                            />
                                            &nbsp;Nota's
                                        </span>
                                    }
                                    onClickAction={this.syncInvoicesToTwinfield}
                                />
                            )}
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <ButtonText
                                    loading={this.state.syncingFromInvoices}
                                    loadText={'Betalingen aan het ophalen'}
                                    buttonText={
                                        <span>
                                            <span
                                                className="glyphicon glyphicon-refresh"
                                                title="Betalingen van Twinfield ophalen"
                                            />
                                            &nbsp;Betalingen
                                        </span>
                                    }
                                    onClickAction={this.showModalFromDateSent}
                                />
                            )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Administratie: {this.props.name}</h4>
                </div>
                <div className="col-md-4" />

                {this.state.showModalFromDateSent && (
                    <InvoicesSyncFromTwinfield
                        administrationId={this.props.administrationDetails.id}
                        oldestUnpaidInvoiceDate={moment(
                            this.props.administrationDetails.oldestUnpaidInvoiceDate
                        ).format('DD-MM-Y')}
                        fromDateSent={this.state.fromDateSent}
                        handleInputChangeDate={this.handleInputChangeDate}
                        confirmAction={this.syncInvoicesFromTwinfield}
                        errors={this.state.errors}
                        closeModal={this.closeModalFromDateSent}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.administrationDetails.name,
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialToolbar);
