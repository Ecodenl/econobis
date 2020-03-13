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
            <option value="rel">heeft</option>
            <option value="nrel">heeft geen</option>
            <option value="eq">is</option>
            <option value="neq">is geen</option>
        </select>
    );
};

export default DataTableBody;
