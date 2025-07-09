import React, { Component } from 'react';

import ContactDetailsFormAddressList from './ContactDetailsFormAddressList';
import ContactDetailsFormAddressNew from './ContactDetailsFormAddressNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class ContactDetailsFormAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            addressEnergySupplierNewOrEditOpen: false,
        };
    }

    toggleShowNew = () => {
        const currentShowNew = this.state.showNew;
        this.setState({
            showNew: !currentShowNew,
        });
        this.setAddressEnergySupplierNewOrEditOpen(!currentShowNew);
    };

    setAddressEnergySupplierNewOrEditOpen = falseTrue => {
        this.setState({
            addressEnergySupplierNewOrEditOpen: falseTrue,
        });
    };

    setAddressDongleNewOrEditOpen = falseTrue => {
        this.setState({
            addressDongleNewOrEditOpen: falseTrue,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Adres / Energieleverancier gegevens</span>
                    {this.props.permissions.createContactAddress &&
                        this.state.addressEnergySupplierNewOrEditOpen == false && (
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                                <Icon size={14} icon={plus} />
                            </a>
                        )}
                    {this.props.permissions.createContactAddress && this.state.addressDongleNewOrEditOpen == false && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormAddressList
                            setAddressEnergySupplierNewOrEditOpen={this.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={this.state.addressEnergySupplierNewOrEditOpen}
                            setAddressDongleNewOrEditOpen={this.setAddressDongleNewOrEditOpen}
                            addressDongleNewOrEditOpen={this.state.addressDongleNewOrEditOpen}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.props.permissions.createContactAddress && this.state.showNew && (
                            <ContactDetailsFormAddressNew toggleShowNew={this.toggleShowNew} />
                        )}
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

export default connect(mapStateToProps, null)(ContactDetailsFormAddress);
