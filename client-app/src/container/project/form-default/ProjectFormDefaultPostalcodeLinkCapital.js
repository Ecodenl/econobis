import React from 'react';
import InputText from '../../../components/form/InputText';

const ProjectFormDefaultPostalcodeLinkCapital = ({
    postalcodeLink,
    taxReferral,
    eanManager,
    ean,
    warrantyOrigin,
    eanSupply,
    handleInputChange,
    errors,
}) => (
    <React.Fragment>
        <hr style={{ margin: '10px 0' }} />
        <h4>Postcoderoos kapitaal</h4>
        <div className="row">
            <InputText
                label={'Postcoderoosgebied'}
                name={'postalcodeLink'}
                value={postalcodeLink}
                onChangeAction={handleInputChange}
                size={'col-sm-5'}
                textToolTip={`Voor postcoderoosgebied geef de postcodes op gescheiden door een comma(,). Gebruik geen spaties. Voorbeeld: 1001,1002,1003AA,1003AB`}
                error={errors.postalcodeLink}
                errorMessage={'Ongeldige invoer, klik (i) voor uitleg.'}
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

export default ProjectFormDefaultPostalcodeLinkCapital;
