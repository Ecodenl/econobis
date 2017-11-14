import React from 'react';
import PropTypes from 'prop-types';

const DataTableHeadTitleAndSort = props => {
    const {RowClassName, setSorts, sortColumn, title, width } = props;

    return (
        <th className={RowClassName} width={width}>
            {title}
            <span className="glyphicon glyphicon-arrow-down pull-right small" role="button" onClick={setSorts.bind(this, sortColumn, 'ASC')} />
            <span className="glyphicon glyphicon-arrow-up pull-right small" role="button" onClick={setSorts.bind(this, sortColumn, 'DESC')} />
        </th>
    )
};

DataTableHeadTitleAndSort.defaultProps = {
    RowClassName: '',
};

DataTableHeadTitleAndSort.propTypes = {
    setSorts: PropTypes.func.isRequired,
    sortColumn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    RowClassName: PropTypes.string,
};

export default DataTableHeadTitleAndSort;