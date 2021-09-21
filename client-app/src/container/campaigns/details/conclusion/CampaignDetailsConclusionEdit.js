import React, { useState } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

import InputDate from '../../../../components/form/InputDate';

function CampaignFormEdit({ campaign: { id, createdBy, createdAt, ownedBy }, switchToView, users, fetchCampaignData }) {
    const [ownedById, setOwnedById] = useState(ownedBy?.id);
    const [errors, setErrors] = useState({
        ownedBy: false,
    });

    function handleInputChange(event) {
        setOwnedById(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let hasErrors = false;

        if (validator.isEmpty('' + ownedById)) {
            setErrors({ ownedBy: true });
            hasErrors = true;
        }

        if (!hasErrors) {
            try {
                await CampaignDetailsAPI.updateCampaignOwner(id, ownedById);

                fetchCampaignData();
                switchToView();
            } catch (error) {
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <InputText label={'Gemaakt door'} name={'createdBy'} value={createdBy.fullName} readOnly={true} />
                <InputSelect
                    label={'Verantwoordelijke'}
                    size={'col-sm-6'}
                    name={'ownedById'}
                    options={users}
                    value={ownedById}
                    optionName={'fullName'}
                    onChangeAction={handleInputChange}
                    error={errors.ownedBy}
                />
            </div>
            <div className="row">
                <InputDate
                    label={'Gemaakt op'}
                    size={'col-sm-6'}
                    name={'createdAt'}
                    value={createdAt ? createdAt : ''}
                    readOnly={true}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={switchToView} />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(CampaignFormEdit);
