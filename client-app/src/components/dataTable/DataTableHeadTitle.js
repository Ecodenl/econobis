import React from 'react';
import PropTypes from 'prop-types';

const DataTableHeadTitle = props => {
    const {RowClassName, setSorts, sortColumn, title, width } = props;

    return (
        <th className={RowClassName} width={width}>
            {title}
            <span className="glyphicon glyphicon-arrow-down pull-right small" role="button" onClick={setSorts.bind(this, sortColumn, 'ASC')} />
            <span className="glyphicon glyphicon-arrow-up pull-right small" role="button" onClick={setSorts.bind(this, sortColumn, 'DESC')} />
        </th>
    )
};

DataTableHeadTitle.defaultProps = {
    RowClassName: '',
};

DataTableHeadTitle.propTypes = {
    setSorts: PropTypes.func.isRequired,
    sortColumn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    RowClassName: PropTypes.string,
};

export default DataTableHeadTitle;