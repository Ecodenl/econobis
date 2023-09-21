import React, {Component, useEffect, useState} from 'react';
import FreeFieldsAPI from "../../api/free-fields/FreeFieldsAPI";
import axios from "axios";

class FreeFieldsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeFieldsFields: [],
            table: "",
            id: "",
            value: "",
        };
    }

    fetchFreeFieldsFieldRecords() {
        const {
            id,
            table
        } = this.props;

        FreeFieldsAPI.fetchFreeFieldsFieldRecords(table, id)
            .then(payloadFreeFieldsFieldRecords => {
                this.setState({ ...this.state, freeFieldsFields: payloadFreeFieldsFieldRecords.data.data });
            })

            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    componentDidMount()
    {
        this.fetchFreeFieldsFieldRecords();
    }

    render() {
        const {
            switchToEdit
        } = this.props;

        return (
            <>
                <div className={`panel panel-default`} onClick={switchToEdit}>
                    <div className="panel-heading "><span className="h5 text-bold">Vrije velden</span></div>
                    <div className="panel-body ">
                        <div className="row">
                            {this.state.freeFieldsFields.map(freeFieldsField => {
                                this.state.value = null
                                switch(freeFieldsField.fieldFormatType) {
                                    case "boolean":
                                        switch(freeFieldsField.fieldRecordValueBoolean) {
                                            case null:
                                                this.state.value = null;
                                                break;
                                            case 1:
                                                this.state.value = "Ja";
                                                break;
                                            default:
                                                this.state.value = "Nee";
                                                break;
                                        }
                                        break;
                                    case "text_short":
                                    case "text_long":
                                        this.state.value = freeFieldsField.fieldRecordValueText;
                                        break;
                                    case "int":
                                        this.state.value = freeFieldsField.fieldRecordValueInt;
                                        break;
                                    case "double_2_dec":
                                        this.state.value = freeFieldsField.fieldRecordValueDouble;
                                        break;
                                    case "amount_euro":
                                        this.state.value = freeFieldsField.fieldRecordValueDouble;
                                        break;
                                    case "date":
                                        if(freeFieldsField.fieldRecordValueDatetime !== null) {
                                            let objectDate = new Date(freeFieldsField.fieldRecordValueDatetime);
                                            this.state.value = objectDate.toLocaleDateString('nl-NL').split(' ')[0];
                                        } else {
                                            let objectDate = ""
                                        }
                                        break;
                                    case "datetime":
                                        if(freeFieldsField.fieldRecordValueDatetime !== null) {
                                            let objectDate = new Date(freeFieldsField.fieldRecordValueDatetime);
                                            this.state.value = objectDate.toLocaleDateString('nl-NL');
                                        } else {
                                            let objectDate = ""
                                        }
                                }

                                return (
                                    <div className="col-xs-6">
                                        <label className={"col-sm-6"}>{freeFieldsField.fieldName}</label>
                                        <div className={"col-sm-6"}>{this.state.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );

    }
}

export default FreeFieldsView;
