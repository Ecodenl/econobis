import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../components/button/ButtonIcon';
import AdministrationDetailsAPI from '../../api/administration/AdministrationDetailsAPI';
import ButtonText from '../../components/button/ButtonText';
import { setError } from '../../actions/general/ErrorActions';
import moment from 'moment/moment';
import InvoicesSyncFromTwinfield from './InvoicesSyncFromTwinfield';
import InvoicesSyncToTwinfield from './InvoicesSyncToTwinfield';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';

// Functionele wrapper voor de class component
const FinancialToolbarWrapper = props => {
    const navigate = useNavigate();
    return <FinancialToolbar {...props} navigate={navigate} />;
};

class FinancialToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            syncingToInvoices: false,
            syncingFromInvoices: false,
            showModalInvoicesSyncToTwinfield: false,
            showModalInvoicesSyncFromTwinfield: false,
            fromDateToFromTwinfield: moment('2019-01-01').format('Y-MM-DD'),
            fromDateSentFromTwinfield: moment()
                .subtract(1, 'year')
                .format('Y-MM-DD'),
            errors: {
                fromDateSentFromTwinfield: false,
            },
        };
    }

    syncInvoicesToTwinfield = () => {
        this.setState({
            ...this.state,
            showModalInvoicesSyncToTwinfield: false,
            syncingToInvoices: true,
        });
        AdministrationDetailsAPI.syncSentInvoicesToTwinfield(this.props.administrationDetails.id)
            .then(payload => {
                this.setState({ syncingToInvoices: false });
                this.props.setError(200, payload.data);
                this.props.navigate(`/financieel/${this.props.administrationDetails.id}/notas/geexporteerd`);
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
            showModalInvoicesSyncFromTwinfield: false,
            syncingFromInvoices: true,
        });
        AdministrationDetailsAPI.syncSentInvoicesFromTwinfield(
            this.props.administrationDetails.id,
            this.state.fromDateSentFromTwinfield
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

    showModalInvoicesSyncToTwinfield = () => {
        this.setState({
            ...this.state,
            fromDateSentToTwinfield: this.props.administrationDetails.dateSyncTwinfieldInvoices,
            showModalInvoicesSyncToTwinfield: true,
        });
    };

    closeModalInvoicesSyncToTwinfield = () => {
        this.setState({
            ...this.state,
            showModalInvoicesSyncToTwinfield: false,
        });
    };
    showModalInvoicesSyncFromTwinfield = () => {
        const oneYearAgo = moment()
            .subtract(1, 'year')
            .format('Y-MM-DD');
        const oldestUnpaidInvoiceDate = this.props.administrationDetails.oldestUnpaidInvoiceDate;

        this.setState({
            ...this.state,
            fromDateSentFromTwinfield: oldestUnpaidInvoiceDate < oneYearAgo ? oneYearAgo : oldestUnpaidInvoiceDate,
            showModalInvoicesSyncFromTwinfield: true,
        });
    };

    closeModalInvoicesSyncFromTwinfield = () => {
        this.setState({
            ...this.state,
            showModalInvoicesSyncFromTwinfield: false,
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
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <ButtonText
                                    loading={this.state.syncingToInvoices}
                                    loadText={'Aan het synchroniseren'}
                                    buttonText={
                                        <span title="Notas naar Twinfield synchroniseren">
                                            <Icon size={14} icon={refresh} />
                                            &nbsp;Nota's
                                        </span>
                                    }
                                    onClickAction={this.showModalInvoicesSyncToTwinfield}
                                />
                            )}
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <ButtonText
                                    loading={this.state.syncingFromInvoices}
                                    loadText={'Betalingen aan het ophalen'}
                                    buttonText={
                                        <span title="Betalingen van Twinfield ophalen">
                                            <Icon size={14} icon={refresh} />
                                            &nbsp;Betalingen
                                        </span>
                                    }
                                    onClickAction={this.showModalInvoicesSyncFromTwinfield}
                                />
                            )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Administratie: {this.props.name}</h4>
                </div>
                <div className="col-md-4" />

                {this.state.showModalInvoicesSyncToTwinfield && (
                    <InvoicesSyncToTwinfield
                        administrationId={this.props.administrationDetails.id}
                        fromDateSent={moment(this.state.fromDateSentToTwinfield).format('DD-MM-Y')}
                        handleInputChangeDate={this.handleInputChangeDate}
                        confirmAction={this.syncInvoicesToTwinfield}
                        errors={this.state.errors}
                        closeModal={this.closeModalInvoicesSyncToTwinfield}
                    />
                )}
                {this.state.showModalInvoicesSyncFromTwinfield && (
                    <InvoicesSyncFromTwinfield
                        administrationId={this.props.administrationDetails.id}
                        oldestUnpaidInvoiceDate={moment(
                            this.props.administrationDetails.oldestUnpaidInvoiceDate
                        ).format('DD-MM-Y')}
                        fromDateSent={this.state.fromDateSentFromTwinfield}
                        handleInputChangeDate={this.handleInputChangeDate}
                        confirmAction={this.syncInvoicesFromTwinfield}
                        errors={this.state.errors}
                        closeModal={this.closeModalInvoicesSyncFromTwinfield}
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

export default connect(mapStateToProps, mapDispatchToProps)(FinancialToolbarWrapper);
