import React from 'react';
import InputText from '../../../../../components/form/InputText';

const ProjectFormEditLoan = ({ handleInputChange }) => (
    <React.Fragment>
        <hr style={{ margin: '10px 0' }} />
        <h4>Lening</h4>
        <div className="row">
            <InputText
                label={'Lening nodig'}
                name={'loan_needed'}
                value={'Database eerst aanpassen'}
                onChangeAction={handleInputChange}
            />
            <InputText label={'Lening opgehaald'} name={'code'} value={''} onChangeAction={() => {}} readOnly={true} />
        </div>

        <div className="row">
            <div className={'form-group col-md-6'} />
            <InputText
                label={'Lening opgehaald in optie'}
                name={'code'}
                value={''}
                onChangeAction={() => {}}
                readOnly={true}
            />
        </div>

        <div className="row">
            <div className={'form-group col-md-6'} />
            <InputText
                label={'Lening uit te geven'}
                name={'code'}
                value={''}
                onChangeAction={() => {}}
                readOnly={true}
            />
        </div>
    </React.Fragment>
);

export default ProjectFormEditLoan;
