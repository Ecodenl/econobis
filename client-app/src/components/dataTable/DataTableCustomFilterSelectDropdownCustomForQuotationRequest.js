import React from 'react';

const DataTableBody = props => {
    return (
        <select
            disabled={props.readOnly}
            className="form-control input-sm"
            name={'type'}
            value={props.type}
            onChange={props.handleInputChange}
        >
            <option value="eq">gelijk aan</option>
            <option value="neq">niet gelijk aan</option>
            <option value="nl">geen kansactie koppelingen</option>
            <option value="nnl">minimaal één kansactie koppelingen</option>
        </select>
    );
};

export default DataTableBody;

