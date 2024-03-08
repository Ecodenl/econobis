import React from 'react';
import moment from 'moment';

moment.locale('nl');
import ButtonText from '../../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../../components/panel/PanelFooter';
import InputText from '../../../../../../../components/form/InputText';
import ViewText from '../../../../../../../components/form/ViewText';

const PartEnergySupplierExcelNew = props => {
    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={'Bestandsnaam'}
                    name={'documentName'}
                    value={props.documentName}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.documentName}
                    errorMessage={props.errorMessage.documentName}
                    divSize={'col-sm-12'}
                    labelSize={'col-sm-3'}
                    size={'col-sm-9'}
                />
                <ViewText
                    className={'form-group col-sm-12'}
                    labelSize={'col-sm-3'}
                    valueSize={'col-sm-9'}
                    label={''}
                    value={'(Bestandsnaam wordt aangevuld met afkorting leverancier en ingestelde bestandsformaat)'}
                />
            </div>

            <div className="row">
                {props.revenuePartsKwhForReport &&
                props.revenuePartsKwhForReport.distributionForReportEnergySupplier &&
                props.revenuePartsKwhForReport.distributionForReportEnergySupplier.length == 0 &&
                props.revenuePartsKwhForReport.distributionForReportEnergySupplier.length > 100 ? (
                    <>
                        <ViewText
                            className={'form-group col-sm-12'}
                            labelSize={'col-sm-3'}
                            valueSize={'col-sm-9'}
                            label={'Rapportage voor deelnames'}
                            value={
                                'Alle (aantal: ' +
                                props.revenuePartsKwhForReport.distributionForReportEnergySupplier.length +
                                ')'
                            }
                        />
                    </>
                ) : props.revenuePartsKwhForReport &&
                  props.revenuePartsKwhForReport.distributionForReportEnergySupplier &&
                  props.revenuePartsKwhForReport.distributionForReportEnergySupplier.length > 0 ? (
                    <>
                        <ViewText
                            className={'form-group col-sm-12'}
                            labelSize={'col-sm-3'}
                            valueSize={'col-sm-9'}
                            label={'Rapportage voor deelnames'}
                            value={props.revenuePartsKwhForReport.distributionForReportEnergySupplier.map(
                                (distribution, i) => {
                                    return (
                                        <>
                                            <strong>{distribution.contactName}</strong>
                                            {distribution.deliveredKwhUpTo != 0 ? (
                                                <>
                                                    {' kWh te verwerken:  '}
                                                    {distribution.deliveredKwhUpTo.toLocaleString('nl', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </>
                                            ) : distribution.isLastPart ? (
                                                ' (Op verwerkt zetten)'
                                            ) : (
                                                ''
                                            )}
                                            <br />
                                        </>
                                    );
                                }
                            )}
                        />
                    </>
                ) : (
                    <>
                        <ViewText
                            className={'form-group col-sm-12'}
                            labelSize={'col-sm-3'}
                            valueSize={'col-sm-9'}
                            label={'Rapportage voor deelnames'}
                            value={'Geen'}
                        />
                    </>
                )}
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={props.cancel} />
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

export default PartEnergySupplierExcelNew;
