import React from 'react';
import MyAreasOfInterestForm from './Form';

const MyAreasOfInterest = function() {
    // TODO Fetch values from API
    const initialValues = {
        general: [],
        participation: [{ id: 1, name: 'Test groep', value: true }, { id: 2, name: 'Test download', value: false }],
        myAreasOfInterest: [],
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
