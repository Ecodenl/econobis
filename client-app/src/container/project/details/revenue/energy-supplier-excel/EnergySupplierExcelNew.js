import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';

const EnergySupplierExcelNew = props => {
    const { energySupplierId, documentName } = props.excel;

    let energySupplierOptions = [];
    energySupplierOptions.push({ id: 0, name: '** Alle energie leveranciers **' });
    props.energySuppliers.map(energySupplier => {
        energySupplierOptions.push({ id: energySupplier.id, name: energySupplier.name });
    });

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={'Contacten van Energie Leverancier'}
                    name={'energySupplierId'}
                    options={energySupplierOptions}
                    emptyOption={false}
                    value={energySupplierId}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.energySupplierId}
                />
                Maak overzicht per leverancier voor alle leveranciers (bestand per leverancier) of een specifieke
                leverancier
            </div>

            <div className="row">
                <InputText
                    label={'Bestandsnaam'}
                    name={'documentName'}
                    value={documentName}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.documentName}
                />
                {energySupplierId == 0
                    ? '(Bestandsnaam wordt aangevuld met afkorting leverancier en ingestelde bestandsformaat)'
                    : '(Bestandsnaam wordt aangevuld met ingestelde bestandsformaat bij leverancier)'}
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonClassName={'btn-default'}
                        buttonText={'Annuleren'}
                        onClickAction={props.switchToView}
                    />
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        energySuppliers: state.systemData.energySuppliers,
    };
};

export default connect(mapStateToProps)(EnergySupplierExcelNew);
