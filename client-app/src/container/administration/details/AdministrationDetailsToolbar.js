import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import AdministrationDeleteItem from './AdministrationDeleteItem';
import ButtonText from '../../../components/button/ButtonText';
import AdministrationDetailsAPI from '../../../api/administration/AdministrationDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';

// Functionele wrapper voor de class component
const AdministrationToolbarWrapper = props => {
    const navigate = useNavigate();
    return <AdministrationToolbar {...props} navigate={navigate} />;
};

class AdministrationToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            syncingToCustomers: false,
            syncingToInvoices: false,
            syncingFromInvoices: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    syncContactsToTwinfield = () => {
        this.setState({ syncingToCustomers: true });
        AdministrationDetailsAPI.syncSentContactsToTwinfield(this.props.administrationDetails.id).then(payload => {
            this.setState({ syncingToCustomers: false });
            this.props.setError(200, payload.data);
        });
    };

    syncInvoicesToTwinfield = () => {
        this.setState({ syncingToInvoices: true });
        AdministrationDetailsAPI.syncSentInvoicesToTwinfield(this.props.administrationDetails.id).then(payload => {
            this.setState({ syncingToInvoices: false });
            this.props.setError(200, payload.data);
        });
    };

    syncInvoicesFromTwinfield = () => {
        this.setState({ syncingFromInvoices: true });
        AdministrationDetailsAPI.syncSentInvoicesFromTwinfield(this.props.administrationDetails.id, null).then(
            payload => {
                this.setState({ syncingFromInvoices: false });
                this.props.setError(200, payload.data);
            }
        );
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <>
                                    <ButtonText
                                        loading={this.state.syncingToCustomers}
                                        loadText={'Aan het synchroniseren'}
                                        buttonText={
                                            <span title="Contacten naar Twinfield synchroniseren">
                                                <Icon size={14} icon={refresh} />
                                                &nbsp;Contacten
                                            </span>
                                        }
                                        onClickAction={this.syncContactsToTwinfield}
                                    />
                                    <ButtonText
                                        loading={this.state.syncingToInvoices}
                                        loadText={'Aan het synchroniseren'}
                                        buttonText={
                                            <span title="Notas naar Twinfield synchroniseren">
                                                <Icon size={14} icon={refresh} />
                                                &nbsp;Nota's
                                            </span>
                                        }
                                        onClickAction={this.syncInvoicesToTwinfield}
                                    />
                                    <ButtonText
                                        loading={this.state.syncingFromInvoices}
                                        loadText={'Betalingen aan het ophalen'}
                                        buttonText={
                                            <span title="Betalingen van Twinfield ophalen">
                                                <Icon size={14} icon={refresh} />
                                                &nbsp;Betalingen
                                            </span>
                                        }
                                        onClickAction={this.syncInvoicesFromTwinfield}
                                    />
                                </>
                            )}
                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Administratie: {this.props.name}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <AdministrationDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        name={this.props.name}
                        id={this.props.id}
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
        id: state.administrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationToolbarWrapper);
