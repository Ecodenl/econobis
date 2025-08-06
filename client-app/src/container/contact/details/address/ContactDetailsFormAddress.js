import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ContactDetailsFormAddressList from './ContactDetailsFormAddressList';
import ContactDetailsFormAddressNew from './ContactDetailsFormAddressNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function ContactDetailsFormAddress() {
    const [showNew, setShowNew] = useState(false);
    const [addressEnergySupplierNewOrEditOpen, setAddressEnergySupplierNewOrEditOpen] = useState(false);
    const [addressDongleNewOrEditOpen, setAddressDongleNewOrEditOpen] = useState(false);

    const permissions = useSelector(state => state.meDetails.permissions);

    const toggleShowNew = () => {
        const newState = !showNew;
        setShowNew(newState);
        setAddressEnergySupplierNewOrEditOpen(newState);
    };

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Adres / Energieleverancier gegevens</span>
                {permissions.createContactAddress &&
                    !addressEnergySupplierNewOrEditOpen &&
                    !addressDongleNewOrEditOpen && (
                        <a role="button" className="pull-right" onClick={toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <ContactDetailsFormAddressList
                        setAddressEnergySupplierNewOrEditOpen={setAddressEnergySupplierNewOrEditOpen}
                        addressEnergySupplierNewOrEditOpen={addressEnergySupplierNewOrEditOpen}
                        setAddressDongleNewOrEditOpen={setAddressDongleNewOrEditOpen}
                        addressDongleNewOrEditOpen={addressDongleNewOrEditOpen}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    {permissions.createContactAddress && showNew && (
                        <ContactDetailsFormAddressNew toggleShowNew={toggleShowNew} />
                    )}
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ContactDetailsFormAddress;
