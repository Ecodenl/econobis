import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';

const ProjectFormEditPostalcodeLinkCapital = ({
    postalcodeLink,
    taxReferral,
    eanManager,
    ean,
    warrantyOrigin,
    eanSupply,
    handleInputChange,
    projectTypes,
    projectTypeId,
}) => {
    const showEditPostalcodeLinkCapital =
        projectTypes.find(projectType => projectType.codeRef === 'postalcode_area_capital').id == projectTypeId;

    if (showEditPostalcodeLinkCapital) {
        return (
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
                    <InputText
                        label={'EAN Adres installatie'}
                        name={'ean'}
                        value={ean}
                        onChangeAction={handleInputChange}
                    />
                    <InputText
                        label={'EAN Netbeheer'}
                        name={'eanManager'}
                        value={eanManager}
                        onChangeAction={handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'EAN afnemer'}
                        name={'eanSupply'}
                        value={eanSupply}
                        onChangeAction={handleInputChange}
                    />
                    <InputText
                        label={'Garantie van oorsprong (Certiq)'}
                        name={'warrantyOrigin'}
                        value={warrantyOrigin}
                        onChangeAction={handleInputChange}
                    />
                </div>
            </React.Fragment>
        );
    } else return null;
};

const mapStateToProps = state => {
    return {
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectFormEditPostalcodeLinkCapital);
