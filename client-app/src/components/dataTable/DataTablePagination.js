import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const DataTablePagination = props => {
    const { onPageChangeAction, initialPage, recordsPerPage, totalRecords } = props;
    console.log('recordsPerPage: ' + recordsPerPage);
    console.log('totalRecords: ' + totalRecords);
    return (
        <ReactPaginate
            onPageChange={onPageChangeAction}
            pageCount={Math.ceil(totalRecords / recordsPerPage) || 1}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            breakLabel={<a>...</a>}
            breakClassName={'break-me'}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousLabel={<span aria-hidden="true">&laquo;</span>}
            nextLabel={<span aria-hidden="true">&raquo;</span>}
            initialPage={initialPage || 0}
            forcePage={initialPage}
            disableInitialCallback={true}
        />
    );
};

DataTablePagination.defaultProps = {
    recordsPerPage: 20,
};

DataTablePagination.propTypes = {
    initialPage: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number,
    totalRecords: PropTypes.number,
    onPageChangeAction: PropTypes.func.isRequired,
};

export default DataTablePagination;
