import React, { Component, useEffect, useState } from 'react';
import InputText from '../form/InputText';
import InputToggle from '../form/InputToggle';
import ButtonText from '../button/ButtonText';
import InputDate from '../form/InputDate';
import moment from 'moment/moment';
import InputTextArea from '../form/InputTextArea';

class FreeFieldsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeFieldsFields: props.freeFieldsFieldRecords,
            field: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    handleInputChangeDate(date, name) {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            [name]: formattedDate,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ ...this.state });

        this.setState({
            ...this.state,
            isSaving: true,
        });

        const data = new FormData();
    };

    render() {
        const { switchToView } = this.props;
        let inputField = null;

        return (
            <>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className={`panel panel-default`}>
                        <div className="panel-heading ">
                            <span className="h5 text-bold">Vrije velden</span>
                        </div>
                        <div className="panel-body ">
                            <div className="row">
                                {this.state.freeFieldsFields &&
                                    this.state.freeFieldsFields.map(freeFieldsField => {
                                        switch (freeFieldsField.fieldFormatType) {
                                            case 'boolean':
                                                inputField = (
                                                    <InputToggle
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueBoolean}
                                                        onChangeAction={this.handleInputChange}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'text_short':
                                                inputField = (
                                                    <InputText
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueText}
                                                        onChangeAction={this.handleInputChange}
                                                        type={'text'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'text_long':
                                                inputField = (
                                                    <InputTextArea
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueText}
                                                        onChangeAction={this.handleInputChange}
                                                        divSize={'col-sm-12'}
                                                        sizeLabel={'col-sm-12'}
                                                        sizeInput={'col-sm-12'}
                                                    />
                                                );
                                                break;
                                            case 'int':
                                                inputField = (
                                                    <InputText
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueInt}
                                                        onChangeAction={this.handleInputChange}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'double_2_dec':
                                                inputField = (
                                                    <InputText
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueDouble}
                                                        onChangeAction={this.handleInputChange}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'amount_euro':
                                                inputField = (
                                                    <InputText
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueDouble}
                                                        onChangeAction={this.handleInputChange}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'date':
                                                inputField = (
                                                    <InputDate
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueDatetime}
                                                        onChangeAction={this.handleInputChangeDate}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                            case 'datetime':
                                                inputField = (
                                                    <InputDate
                                                        label={freeFieldsField.fieldName}
                                                        name={'freeFieldsFieldRecord' + freeFieldsField.id}
                                                        value={freeFieldsField.fieldRecordValueDatetime}
                                                        onChangeAction={this.handleInputChangeDate}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                    />
                                                );
                                                break;
                                        }

                                        return (
                                            <>
                                                <div className="col-sm-6">{inputField}</div>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="pull-right btn-group" role="group">
                                        <ButtonText
                                            buttonClassName={'btn-default'}
                                            buttonText={'Sluiten'}
                                            onClickAction={switchToView}
                                        />
                                        <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default FreeFieldsEdit;
