import React, { useState } from 'react';
import ViewText from '../form/ViewText';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';

function FreeFieldsView({ freeFieldsFieldRecords, switchToEdit }) {
    return (
        <>
            <div className={`panel panel-default`} onClick={switchToEdit}>
                <div className="panel-heading ">
                    <span className="h5 text-bold">Vrije velden</span>
                </div>
                <div className="panel-body ">
                    <div className="row">
                        {freeFieldsFieldRecords.map(record => {
                            switch (record.fieldFormatType) {
                                case 'boolean':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={record.fieldRecordValueBoolean == true ? 'Ja' : 'Nee'}
                                        />
                                    );
                                    break;
                                case 'text_short':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={record.fieldRecordValueText ? record.fieldRecordValueText : ''}
                                        />
                                    );
                                    break;
                                case 'text_long':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={record.fieldRecordValueText ? record.fieldRecordValueText : ''}
                                            className={'col-sm-12'}
                                            labelSize={'col-sm-3'}
                                            valueSize={'col-sm-9'}
                                        />
                                    );
                                    break;
                                case 'int':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={record.fieldRecordValueInt ? record.fieldRecordValueInt : ''}
                                        />
                                    );
                                    break;
                                case 'double_2_dec':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={
                                                record.fieldRecordValueDouble
                                                    ? parseFloat(record.fieldRecordValueDouble).toFixed(2)
                                                    : ''
                                            }
                                        />
                                    );
                                    break;
                                case 'amount_euro':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={
                                                record.fieldRecordValueDouble
                                                    ? MoneyPresenter(record.fieldRecordValueDouble)
                                                    : ''
                                            }
                                        />
                                    );
                                    break;
                                case 'date':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={
                                                record.fieldRecordValueDatetime
                                                    ? moment(record.fieldRecordValueDatetime).format('L')
                                                    : ''
                                            }
                                        />
                                    );
                                    break;
                                case 'datetime':
                                    return (
                                        <ViewText
                                            label={record.fieldName}
                                            value={
                                                record.fieldRecordValueDatetime
                                                    ? moment(record.fieldRecordValueDatetime).format('L HH:mm')
                                                    : ''
                                            }
                                        />
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
