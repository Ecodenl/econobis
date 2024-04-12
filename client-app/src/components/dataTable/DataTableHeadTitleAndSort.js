import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-icons-kit';
import { arrowUp } from 'react-icons-kit/fa/arrowUp';
import { arrowDown } from 'react-icons-kit/fa/arrowDown';

const DataTableHeadTitleAndSort = props => {
    const { RowClassName, setSorts, sortColumn, title, width } = props;

    return (
        <th className={RowClassName} width={width}>
            {title}
            <Icon
                className="pull-right small"
                size={14}
                icon={arrowDown}
                role="button"
                onClick={setSorts.bind(this, sortColumn, 'ASC')}
            />
            <Icon
                className="pull-right small"
                size={14}
                icon={arrowUp}
                role="button"
                onClick={setSorts.bind(this, sortColumn, 'DESC')}
            />
        </th>
    );
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
