import React, { useState } from 'react';
import ViewText from '../form/ViewText';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';

function FreeFieldsView({ freeFieldsFieldRecords, switchToEdit }) {
    return (
        <>
            <div className={`panel panel-default`} onClick={switchToEdit}>
                <div className="panel-heading ">
                    <span className="h5 text-bold">Vrije velden ({freeFieldsFieldRecords.length})</span>
                </div>
                <div className="panel-body ">
                    <div className="row">
                        {freeFieldsFieldRecords.map(record => {
                            switch (record.fieldFormatType) {
                                case 'boolean':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={record.fieldRecordValueBoolean == true ? 'Ja' : 'Nee'}
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'text_short':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={record.fieldRecordValueText}
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'text_long':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={record.fieldRecordValueText}
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'int':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={record.fieldRecordValueInt}
                                                value={record.fieldRecordValueInt ? record.fieldRecordValueInt : ''}
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'double_2_dec':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={
                                                    record.fieldRecordValueDouble
                                                        ? parseFloat(record.fieldRecordValueDouble).toFixed(2)
                                                        : ''
                                                }
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'amount_euro':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={
                                                    record.fieldRecordValueDouble
                                                        ? MoneyPresenter(record.fieldRecordValueDouble)
                                                        : ''
                                                }
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'date':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={
                                                    record.fieldRecordValueDatetime
                                                        ? moment(record.fieldRecordValueDatetime).format('L')
                                                        : ''
                                                }
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                                    break;
                                case 'datetime':
                                    return (
                                        <div className="col-xs-6">
                                            <ViewText
                                                label={record.fieldName}
                                                value={
                                                    record.fieldRecordValueDatetime
                                                        ? moment(record.fieldRecordValueDatetime).format('L HH:mm')
                                                        : ''
                                                }
                                                className={'col-xs-12'}
                                            />
                                        </div>
                                    );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FreeFieldsView;
