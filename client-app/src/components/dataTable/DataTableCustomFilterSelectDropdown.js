import React from 'react';

const DataTableBody = props => {
    return (
        <select className="form-control input-sm" name={'type'} value={props.type} onChange={props.handleInputChange}>
            <option value='eq'>gelijk aan</option>
            <option value='neq'>niet gelijk aan</option>
        </select>
    )
};

export default DataTableBody;