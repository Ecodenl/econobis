import React from 'react';

const DataTableBody = props => {
    return (
        <select disabled={props.readOnly} className="form-control input-sm" name={'type'} value={props.type} onChange={props.handleInputChange}>
            <option value='eq'>gelijk aan</option>
            <option value='neq'>niet gelijk aan</option>
            <option value='nl'>is leeg</option>
            <option value='nnl'>is niet leeg</option>
        </select>
    )
};

export default DataTableBody;