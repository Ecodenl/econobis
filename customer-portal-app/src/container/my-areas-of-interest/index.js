import React from 'react';
import MyAreasOfInterestForm from './Form';

const MyAreasOfInterest = function() {
    // TODO Fetch values from API
    const initialValues = {
        myAreasOfInterest: [
            { id: 4, name: 'Gevel isolatie', value: true },
            { id: 5, name: 'Zonnepanelen', value: false },
            { id: 6, name: 'Dak isolatie', value: false },
            { id: 7, name: 'Zonneboiler', value: true },
        ],
        participations: [{ id: 2, name: 'Test groep', value: true }, { id: 3, name: 'De leuke mensen', value: false }],
        generalOptions: [{ id: 1, name: 'Test algemeen groep', value: false }],
    };

    return (
        <div className="content-section">
            <div className="content-container w-container">
                <h1 className="content-heading">Instellingen</h1>
                <div className="w-form" />
                <MyAreasOfInterestForm initialValues={initialValues} />
            </div>
        </div>
    );
};

export default MyAreasOfInterest;
