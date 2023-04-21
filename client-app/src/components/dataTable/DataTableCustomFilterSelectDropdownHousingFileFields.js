import React from 'react';

const DataTableBody = props => {
    return (
        <select
            disabled={props.readOnly}
            className="form-control input-sm"
            name={'type'}
            value={props.type}
            onChange={props.handleInputChangeHousingFileFields}
        >
            <option value="eq">is</option>
        </select>
    );
};

export default DataTableBody;
