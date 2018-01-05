import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import EmailsInListItem from './EmailsInListItem';

const EmailsInList = props => {
    return (
        <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Datum'} width={"10%"}/>
                            <DataTableHeadTitle title={'Mailbox'} width={"20%"} />
                            <DataTableHeadTitle title={'Afzender'} width={"20%"} />
                            <DataTableHeadTitle title={'Onderwerp'} width={"45%"} />
                            <DataTableHeadTitle title={''} width={"5%"} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            props.emails.length === 0 ? (
                                <tr><td colSpan={5}>Geen e-mails gevonden!</td></tr>
                            ) : (
                                props.emails.map((email) => {
                                    return <EmailsInListItem
                                        key={email.id}
                                        {...email}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        emails: state.emails,
    };
};

export default connect(mapStateToProps, null)(EmailsInList);