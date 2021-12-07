import React from 'react';
import ViewText from '../../../../../components/form/ViewText';

const ProjectFormViewPostalcodeLinkCapital = ({
    postalcodeLink,
    taxReferral,
    eanManager,
    ean,
    warrantyOrigin,
    eanSupply,
}) => (
    <React.Fragment>
        <hr style={{ margin: '10px 0' }} />
        <h4>Postcoderoos kapitaal</h4>
        <div className="row">
            <ViewText
                label={'Postcoderoosgebied'}
                value={postalcodeLink}
                name={'postalcodeLink'}
                textToolTip={`Voor postcoderoosgebied geef de postcodes op gescheiden door een comma(,). Gebruik geen spaties. Voorbeeld: 1001,1002,1003AA,1003AB`}
            />
            <ViewText label={'Aanwijzing Belastingdienst'} value={taxReferral} />
        </div>
        <div className="row">
            <ViewText label={'EAN Adres installatie'} value={ean} />
            <ViewText label={'EAN Netbeheer'} value={eanManager} />
        </div>
        <div className="row">
            <ViewText label={'EAN afnemer'} value={eanSupply} />
            <ViewText label={'Garantie van oorsprong (Certiq)'} value={warrantyOrigin} />
        </div>
    </React.Fragment>
);

export default ProjectFormViewPostalcodeLinkCapital;
