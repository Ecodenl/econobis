import React from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormContactEnergySupplierItem from './ContactDetailsFormContactEnergySupplierItem';

const ContactDetailsFormContactEnergySupplierList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-2">Type</div>
                <div className="col-sm-2">Klant sinds</div>
                <div className="col-sm-1">Overstap status</div>
                <div className="col-sm-2">Mogelijke overstap datum</div>
                <div className="col-sm-1">Klantnummer</div>
                <div className="col-sm-1">Huidige</div>
                <div className="col-sm-1" />
            </div>
            {props.contactEnergySuppliers.length > 0 ? (
                props.contactEnergySuppliers.map(contactEnergySupplier => {
                    return (
                        <ContactDetailsFormContactEnergySupplierItem
                            key={contactEnergySupplier.id}
                            contactEnergySupplier={contactEnergySupplier}
                        />
                    );
                })
            ) : (
                <div>Geen energieleveranciers bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactEnergySuppliers: state.contactDetails.contactEnergySuppliers,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormContactEnergySupplierList);
