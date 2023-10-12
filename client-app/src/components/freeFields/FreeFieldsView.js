import React, { useState } from 'react';
import ViewText from '../form/ViewText';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';
import ViewText_3_9 from '../form/ViewText_3_9';

function FreeFieldsView({ freeFieldsFieldRecords, switchToEdit }) {
    return (
        <div className="panel-body" onClick={switchToEdit}>
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
                                <ViewText_3_9
                                    label={record.fieldName}
                                    value={record.fieldRecordValueText ? record.fieldRecordValueText : ''}
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
    );
}

export default FreeFieldsView;
