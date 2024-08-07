import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';

const EnergySupplierReportNew = props => {
    const { templateId, documentName } = props.report;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={'Document template'}
                    name={'templateId'}
                    options={props.templates}
                    value={templateId}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.templateId}
                    size={'col-sm-12'}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Document naam'}
                    name={'documentName'}
                    value={documentName}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.documentName}
                    divSize={'col-sm-12'}
                    labelSize={'col-sm-6'}
                    size={'col-sm-6'}
                />
                .pdf
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

export default EnergySupplierReportNew;
