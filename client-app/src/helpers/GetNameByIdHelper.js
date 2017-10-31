import React from 'react';
import PropTypes from 'prop-types';

const GetNameByIdHelper = ({ id, items }) => {
    let result = items.find((item) => {
        return item.id == id;
    });

    if(result === undefined) result = { name: 'Onbekend'};

    return (
        <span> { result.name } </span>
    )
};

GetNameByIdHelper.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    items: PropTypes.array.isRequired,
};

export default GetNameByIdHelper;
