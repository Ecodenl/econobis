import React, {Component, useEffect, useState} from 'react';
import FreeFieldsAPI from "../../api/free-fields/FreeFieldsAPI";
import axios from "axios";

class FreeFieldsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeFieldsFields: [],
            table: "",
            id: "",
            field: "",
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
            switchToView
        } = this.props;

        return (
            <>
                <div className={`panel panel-default`} onClick={switchToView}>
                    <div className="panel-heading "><span className="h5 text-bold">Vrije velden</span></div>
                    <div className="panel-body ">
                        <div className="row">
                            {this.state.freeFieldsFields.map(freeFieldsField => {
                                this.state.field = null
                                switch(freeFieldsField.fieldFormatType) {
                                    case "boolean":
                                        switch(freeFieldsField.fieldRecordValueBoolean) {
                                            case null:
                                                this.state.field = null;
                                                break;
                                            case 1:
                                                this.state.field = "Ja";
                                                break;
                                            default:
                                                this.state.field = "Nee";
                                                break;
                                        }
                                        break;
                                    case "text_short":
                                    case "text_long":
                                        this.state.field = freeFieldsField.fieldRecordValueText;
                                        break;
                                    case "int":
                                        this.state.field = freeFieldsField.fieldRecordValueInt;
                                        break;
                                    case "double_2_dec":
                                        this.state.field = freeFieldsField.fieldRecordValueDouble;
                                        break;
                                    case "amount_euro":
                                        this.state.field = freeFieldsField.fieldRecordValueDouble;
                                        break;
                                    case "date":
                                        if(freeFieldsField.fieldRecordValueDatetime !== null) {
                                            let objectDate = new Date(freeFieldsField.fieldRecordValueDatetime);
                                            this.state.field = objectDate.toLocaleDateString('nl-NL').split(' ')[0];
                                        } else {
                                            let objectDate = ""
                                        }
                                        break;
                                    case "datetime":
                                        if(freeFieldsField.fieldRecordValueDatetime !== null) {
                                            let objectDate = new Date(freeFieldsField.fieldRecordValueDatetime);
                                            this.state.field = objectDate.toLocaleDateString('nl-NL');
                                        } else {
                                            let objectDate = ""
                                        }
                                }

                                return (
                                    <div className="col-xs-6">
                                        <label className={"col-sm-6"}>{freeFieldsField.fieldName}</label>
                                        <div className={"col-sm-6"}>{this.state.field}</div>
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

export default FreeFieldsEdit;
