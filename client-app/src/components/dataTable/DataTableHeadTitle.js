import React from 'react';
import PropTypes from 'prop-types';

const DataTableHeadTitle = props => {
    const { RowClassName, title, width } = props;

    return (
        <th className={RowClassName} width={width}>
            {title}
        </th>
    );
};

DataTableHeadTitle.defaultProps = {
    RowClassName: '',
};

DataTableHeadTitle.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    RowClassName: PropTypes.string,
};

export default DataTableHeadTitle;
