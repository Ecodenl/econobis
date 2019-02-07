import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';

const ProjectFormViewPostalcodeAreaCapital = ({
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
    const showViewPostalcodeAreaCapital =
        projectTypes.find(projectType => projectType.codeRef === 'postalcode_area_capital').id == projectTypeId;

    if (showViewPostalcodeAreaCapital) {
        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Postcoderoos kapitaal</h4>
                <div className="row">
                    <ViewText label={'Postcoderoos'} value={postalcodeLink} />
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
    } else return null;
};

const mapStateToProps = state => {
    return {
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectFormViewPostalcodeAreaCapital);
