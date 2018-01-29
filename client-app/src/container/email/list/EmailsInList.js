import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import EmailsInListItem from './EmailsInListItem';

const EmailsInList = props => {
    const { data = [], meta = {}, isLoading } = props.emails;

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Datum'} width={"10%"}/>
                        <DataTableHeadTitle title={'Mailbox'} width={"20%"} />
                        <DataTableHeadTitle title={'Afzender'} width={"20%"} />
                        <DataTableHeadTitle title={'Onderwerp'} width={"25%"} />
                        <DataTableHeadTitle title={'Status'} width={"10%"} />
                        <DataTableHeadTitle title={''} width={"5%"} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr><td colSpan={6}>Geen e-mails gevonden!</td></tr>
                        ) : (
                            data.map((email) => {
                                return <EmailsInListItem
                                    key={email.id}
                                    {...email}
                                />
                            })
                        )
                    }
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <ReactPaginate
                    onPageChange={props.handlePageClick}
                    pageCount={ Math.ceil(meta.total / 20) || 1 }
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    breakLabel={<a>...</a>}
                    breakClassName={"break-me"}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousLabel={<span aria-hidden="true">&laquo;</span>}
                    nextLabel={<span aria-hidden='true'>&raquo;</span>}
                    initialPage={props.emailsPagination.page || 0}
                    forcePage={props.emailsPagination.page}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        emails: state.emails.list,
        emailsPagination: state.emails.pagination,
    };
};

export default connect(mapStateToProps, null)(EmailsInList);