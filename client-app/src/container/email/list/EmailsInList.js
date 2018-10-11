import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import EmailsInListItem from './EmailsInListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";
import EmailsInListHead from "./EmailsInListHead";
import EmailsInListFilter from "./EmailsInListFilter";

const EmailsInList = props => {
    const { data = [], meta = {}, isLoading } = props.emails;

    // On key Enter filter form will submit
    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            props.onSubmitFilter();
        }
    };

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
            <DataTable>
                <DataTableHead>
                    <EmailsInListHead
                        fetchEmailsData={() => props.fetchEmailsData()}
                    />
                    <EmailsInListFilter
                        folder={props.folder}
                        onSubmitFilter={props.onSubmitFilter}
                    />
                </DataTableHead>

                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr><td colSpan={9}>Geen e-mails gevonden!</td></tr>
                        ) : (
                            data.map((email) => {
                                return <EmailsInListItem
                                    fetchEmailsData={props.fetchEmailsData}
                                    key={email.id}
                                    {...email}
                                />
                            })
                        )
                    }
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <DataTablePagination
                    onPageChangeAction={props.handlePageClick}
                    totalRecords={meta.total}
                    initialPage={props.emailsPagination.page}
                />
            </div>
            </form>
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