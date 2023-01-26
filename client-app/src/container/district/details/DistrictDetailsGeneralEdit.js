import React from 'react';
import DistrictAPI from "../../../api/district/DistrictAPI";
import DistrictGeneralEditForm from "../generic/DistrictGeneralEditForm";

export default function DistrictDetailsGeneralEdit({district, switchToView, onSave}) {
    const handleSubmit = (values, {setSubmitting}) => {
        DistrictAPI.updateDistrict(values)
            .then(() => {
                onSave();
                switchToView();
            })
            .catch(() => {
                setSubmitting(false);
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    };

    return (
        <DistrictGeneralEditForm initialValues={district} onSubmit={handleSubmit} cancelAction={switchToView}/>
    );
}