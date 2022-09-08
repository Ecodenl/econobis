import React from 'react';
import { connect } from 'react-redux';
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
                />
                (Bestandsnaam wordt aangevuld met afkorting leverancier en ingestelde bestandsformaat)
            </div>

            <div className="row">
                {props.revenuePartsKwh &&
                props.revenuePartsKwh.distributionKwhForReportEnergySupplier &&
                props.revenuePartsKwh.distributionKwhForReportEnergySupplier.length == 0 &&
                    props.revenuePartsKwh.distributionKwhForReportEnergySupplier.length > 100 ? (
                    <>
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Rapportage voor deelnames'}
                            value={
                                'Alle (aantal: ' +
                                props.revenuePartsKwh.distributionKwhForReportEnergySupplier.length +
                                ')'
                            }
                        />
                    </>
                ) : props.revenuePartsKwh &&
                  props.revenuePartsKwh.distributionKwhForReportEnergySupplier &&
                  props.revenuePartsKwh.distributionKwhForReportEnergySupplier.length > 0 ? (
                    <>
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Rapportage voor deelnames'}
                            value={props.revenuePartsKwh.distributionKwhForReportEnergySupplier.map(
                                (distribution, i) => {
                                    return (
                                        <>
                                            {distribution.contactName}
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
                            className={'form-group col-sm-6'}
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

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
    };
};

export default connect(mapStateToProps)(PartEnergySupplierExcelNew);
