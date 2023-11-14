import React from 'react';
import DataTableCustomFilterSelectNumber from './DataTableCustomFilterSelectNumber';
import DataTableCustomFilterSelectBoolean from './DataTableCustomFilterSelectBoolean';
import DataTableCustomFilterSelectDate from './DataTableCustomFilterSelectDate';
import DataTableCustomFilterSelectNumberOrString from './DataTableCustomFilterSelectNumberOrString';

const DataTableBody = props => {
    return (
        <>
            {!props.freeFieldFormatType ? (
                <span>Kies eerst een vrij veld contact</span>
            ) : props.freeFieldFormatType === 'boolean' ? (
                <DataTableCustomFilterSelectBoolean
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : props.freeFieldFormatType === 'text_short' || props.freeFieldFormatType === 'text_long' ? (
                <DataTableCustomFilterSelectNumberOrString
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : props.freeFieldFormatType === 'int' ||
              props.freeFieldFormatType === 'double_2_dec' ||
              props.freeFieldFormatType === 'amount_euro' ? (
                <DataTableCustomFilterSelectNumber
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : props.freeFieldFormatType === 'date' || props.freeFieldFormatType === 'datetime' ? (
                <DataTableCustomFilterSelectDate
                    handleInputChange={props.handleInputChange}
                    type={props.type}
                    readOnly={props.readOnly}
                />
            ) : null}
        </>
    );
};

export default DataTableBody;
