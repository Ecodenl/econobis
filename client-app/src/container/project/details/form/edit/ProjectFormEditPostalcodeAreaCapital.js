import React from 'react';
import InputText from '../../../../../components/form/InputText';

const ProjectFormEditPostalcodeAreaCapital = ({
    postalcodeLink,
    taxReferral,
    eanManager,
    ean,
    warrantyOrigin,
    eanSupply,
    handleInputChange,
}) => (
    <React.Fragment>
        <hr style={{ margin: '10px 0' }} />
        <h4>Postcoderoos kapitaal</h4>
        <div className="row">
            <InputText
                label={'Postcoderoos'}
                name={'postalcodeLink'}
                value={postalcodeLink}
                onChangeAction={handleInputChange}
            />
            <InputText
                label={'Aanwijzing Belastingdienst'}
                name={'taxReferral'}
                value={taxReferral}
                onChangeAction={handleInputChange}
            />
        </div>
        <div className="row">
            <InputText label={'EAN Adres installatie'} name={'ean'} value={ean} onChangeAction={handleInputChange} />
            <InputText
                label={'EAN Netbeheer'}
                name={'eanManager'}
                value={eanManager}
                onChangeAction={handleInputChange}
            />
        </div>
        <div className="row">
            <InputText label={'EAN afnemer'} name={'eanSupply'} value={eanSupply} onChangeAction={handleInputChange} />
            <InputText
                label={'Garantie van oorsprong (Certiq)'}
                name={'warrantyOrigin'}
                value={warrantyOrigin}
                onChangeAction={handleInputChange}
            />
        </div>
    </React.Fragment>
);

export default ProjectFormEditPostalcodeAreaCapital;
