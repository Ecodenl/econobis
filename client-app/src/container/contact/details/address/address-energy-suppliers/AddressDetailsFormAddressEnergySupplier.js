import React, { Component } from 'react';

import AddressDetailsFormAddressEnergySupplierList from './AddressDetailsFormAddressEnergySupplierList';
import AddressDetailsFormAddressEnergySupplierNew from './AddressDetailsFormAddressEnergySupplierNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import ButtonText from '../../../../../components/button/ButtonText';

class AddressDetailsFormAddressEnergySupplier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        const currentShowNew = this.state.showNew;
        this.setState({
            showNew: !currentShowNew,
        });
        this.props.setAddressEnergySupplierNewOrEditOpen(!currentShowNew);
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Energieleverancier gegevens</span>
                    {this.props.permissions.createContactAddress &&
                        (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) &&
                        this.props.addressEnergySupplierNewOrEditOpen == false && (
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                                <span className="glyphicon glyphicon-plus" />
                            </a>
                        )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <AddressDetailsFormAddressEnergySupplierList
                            address={this.props.address}
                            setAddressEnergySupplierNewOrEditOpen={this.props.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={this.props.addressEnergySupplierNewOrEditOpen}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.props.permissions.createContactAddress && this.state.showNew && (
                            <AddressDetailsFormAddressEnergySupplierNew
                                contactId={this.props.address.contactId}
                                addressId={this.props.address.id}
                                memberSinceGasDisabledBefore={this.props.address.memberSinceGasDisabledBefore}
                                memberSinceElectricityDisabledBefore={
                                    this.props.address.memberSinceElectricityDisabledBefore
                                }
                                memberSinceGasAndElectricityDisabledBefore={
                                    this.props.address.memberSinceGasAndElectricityDisabledBefore
                                }
                                toggleShowNew={this.toggleShowNew}
                            />
                        )}
                    </div>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.closeAddressEnergySupplier}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(AddressDetailsFormAddressEnergySupplier);
