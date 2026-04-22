import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import AddressDetailsFormAddressEnergySupplierList from './AddressDetailsFormAddressEnergySupplierList';
import AddressDetailsFormAddressEnergySupplierNew from './AddressDetailsFormAddressEnergySupplierNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import ButtonText from '../../../../../components/button/ButtonText';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function AddressDetailsFormAddressEnergySupplier(props) {
    const {
        permissions,
        address,
        addressEnergySupplierNewOrEditOpen,
        setAddressEnergySupplierNewOrEditOpen,
        closeAddressEnergySupplier,
    } = props;

    const [showNew, setShowNew] = useState(false);

    const toggleShowNew = useCallback(() => {
        setShowNew(prevShowNew => {
            const nextShowNew = !prevShowNew;
            setAddressEnergySupplierNewOrEditOpen(nextShowNew);
            return nextShowNew;
        });
    }, [setAddressEnergySupplierNewOrEditOpen]);

    const canCreate = permissions.createContactAddress && (permissions.updatePerson || permissions.updateOrganisation);

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Energieleverancier gegevens</span>
                {canCreate && !addressEnergySupplierNewOrEditOpen && (
                    <a role="button" className="pull-right" onClick={toggleShowNew}>
                        <Icon size={14} icon={plus} />
                    </a>
                )}
            </PanelHeader>

            <PanelBody>
                <div className="col-md-12">
                    <AddressDetailsFormAddressEnergySupplierList
                        address={address}
                        setAddressEnergySupplierNewOrEditOpen={setAddressEnergySupplierNewOrEditOpen}
                        addressEnergySupplierNewOrEditOpen={addressEnergySupplierNewOrEditOpen}
                    />
                </div>

                <div className="col-md-12 margin-10-top">
                    {canCreate && showNew && (
                        <AddressDetailsFormAddressEnergySupplierNew
                            contactId={address.contactId}
                            addressId={address.id}
                            memberSinceGasDisabledBefore={address.memberSinceGasDisabledBefore}
                            memberSinceElectricityDisabledBefore={address.memberSinceElectricityDisabledBefore}
                            memberSinceGasAndElectricityDisabledBefore={
                                address.memberSinceGasAndElectricityDisabledBefore
                            }
                            toggleShowNew={toggleShowNew}
                        />
                    )}
                </div>

                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonClassName="btn-default"
                        buttonText="Annuleren"
                        onClickAction={closeAddressEnergySupplier}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

export default connect(mapStateToProps)(AddressDetailsFormAddressEnergySupplier);
