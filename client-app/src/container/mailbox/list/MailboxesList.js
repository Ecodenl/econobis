import React from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import MailboxesListItem from './MailboxesListItem';

const MailboxesList = props => {
    return (
        <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={"19%"}/>
                            <DataTableHeadTitle title={'E-mail'} width={"19%"} />
                            <DataTableHeadTitle title={'Gebruikersnaam'} width={"19%"} />
                            <DataTableHeadTitle title={'Ink.server'} width={"19%"}/>
                            {props.usesMailgun ?
                                <DataTableHeadTitle title={'Mailgun domein'} width={"19%"}/>
                                :
                                <DataTableHeadTitle title={'Uitg.server'} width={"19%"}/>
                            }
                            <DataTableHeadTitle title={''} width={"5%"} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            props.mailboxes.length === 0 ? (
                                <tr><td colSpan={6}>Geen mailboxen gevonden!</td></tr>
                            ) : (
                                props.mailboxes.map((mailbox) => {
                                    return <MailboxesListItem
                                        key={mailbox.id}
                                        {...mailbox}
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
        mailboxes: state.mailboxes,
        usesMailgun: state.systemData.usesMailgun,
    };
};

export default connect(mapStateToProps, null)(MailboxesList);