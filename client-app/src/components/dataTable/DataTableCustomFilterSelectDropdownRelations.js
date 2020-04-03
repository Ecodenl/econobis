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
            {props.contactType !== 'person' ? (
                <React.Fragment>
                    <option value="rel">heeft</option>
                    <option value="nrel">heeft geen</option>
                </React.Fragment>
            ) : null}
            {props.contactType !== 'organisation' ? (
                <React.Fragment>
                    <option value="eq">is</option>
                    <option value="neq">is geen</option>
                </React.Fragment>
            ) : null}
        </select>
    );
};

export default DataTableBody;
