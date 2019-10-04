import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import AdministrationDeleteItem from './AdministrationDeleteItem';
import ButtonText from '../../../components/button/ButtonText';
import AdministrationDetailsAPI from '../../../api/administration/AdministrationDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';

class AdministrationToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            syncingToInvoices: false,
            syncingFromInvoices: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
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
        AdministrationDetailsAPI.syncSentInvoicesFromTwinfield(this.props.administrationDetails.id).then(payload => {
            this.setState({ syncingFromInvoices: false });
            this.props.setError(200, payload.data);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {this.props.administrationDetails.usesTwinfield == true &&
                            this.props.administrationDetails.twinfieldIsValid == true && (
                                <ButtonText
                                    loading={this.state.syncingInvoices}
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
                                    onClickAction={this.syncInvoicesFromTwinfield}
                                />
                            )}
                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministrationToolbar);
