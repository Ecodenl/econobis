import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import ConceptsInListItem from './ConceptsInListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';

const ConceptsInList = props => {
    const { data = [], meta = {}, isLoading } = props.emails;

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Datum'} width={'10%'} />
                        <DataTableHeadTitle title={'Mailbox'} width={'20%'} />
                        <DataTableHeadTitle title={'Afzender'} width={'20%'} />
                        <DataTableHeadTitle title={'Onderwerp'} width={'45%'} />
                        <DataTableHeadTitle title={''} width={'5%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5}>Geen e-mails gevonden!</td>
                        </tr>
                    ) : (
                        data.map(email => {
                            return <ConceptsInListItem key={email.id} {...email} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
            <DataTablePagination
                onPageChangeAction={props.handlePageClick}
                totalRecords={meta.total}
                initialPage={props.emailsPagination.page}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        emails: state.emails.list,
        emailsPagination: state.emails.pagination,
    };
};

export default connect(
    mapStateToProps,
    null
)(ConceptsInList);
