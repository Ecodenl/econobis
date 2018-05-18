import React from 'react';

const DataTableBody = props => {
    return (
        <select className="form-control input-sm" name={'type'} value={props.type} onChange={props.handleInputChange}>
            <option value='eq'>heeft</option>
        </select>
    )
};

export default DataTableBody;