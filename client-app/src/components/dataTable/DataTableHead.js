import React from 'react';

const DataTableHead = props => {
    return (
        <thead>
            {props.children}
        </thead>
    )
};

export default DataTableHead;