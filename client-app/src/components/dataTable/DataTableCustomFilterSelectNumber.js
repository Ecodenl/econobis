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
            <option value="lt">kleiner dan</option>
            <option value="lte">kleiner of gelijk aan</option>
            <option value="gt">groter dan</option>
            <option value="gte">groter dan of gelijk aan</option>
            <option value="is0">is 0 of leeg</option>
            <option value="isn0">is niet 0 of leeg</option>
        </select>
    );
};

export default DataTableBody;
