import React, { Component } from 'react';

import ContactDetailsFormAddressList from './ContactDetailsFormAddressList';
import ContactDetailsFormAddressNew from './ContactDetailsFormAddressNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

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

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Adres / Energieleverancier gegevens</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormAddressList
                            setAddressEnergySupplierNewOrEditOpen={this.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={this.state.addressEnergySupplierNewOrEditOpen}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <ContactDetailsFormAddressNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ContactDetailsFormAddress;
