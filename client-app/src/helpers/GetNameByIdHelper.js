import React from 'react';
import PropTypes from 'prop-types';

const GetNameByIdHelper = ({ id, items, unknownName }) => {
    let result = items.find(item => {
        return item.id == id;
    });

    if (result === undefined) result = { name: unknownName };

    return <span> {result.name} </span>;
};
GetNameByIdHelper.defaultProps = {
    unknownName: 'Onbekend',
};

GetNameByIdHelper.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    items: PropTypes.array.isRequired,
    unknownName: PropTypes.string,
};

export default GetNameByIdHelper;
