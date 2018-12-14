import React, {Component} from 'react';
import {connect} from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import MailboxesListItem from './MailboxesListItem';

class MailboxesList extends Component {
    constructor(props) {
        super(props);
    };

    render() {

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van mailboxen.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.mailboxes.length === 0) {
            loadingText = 'Geen mailboxen gevonden!';
        }
        else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={"19%"}/>
                            <DataTableHeadTitle title={'E-mail'} width={"19%"}/>
                            <DataTableHeadTitle title={'Gebruikersnaam'} width={"19%"}/>
                            <DataTableHeadTitle title={'Ink.server'} width={"19%"}/>
                            {this.props.usesMailgun ?
                                <DataTableHeadTitle title={'Mailgun domein'} width={"19%"}/>
                                :
                                <DataTableHeadTitle title={'Uitg.server'} width={"19%"}/>
                            }
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            loading ? (
                                <tr>
                                    <td colSpan={6}>{loadingText}</td>
                                </tr>
                            ) : (
                                this.props.mailboxes.map((mailbox) => {
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
}

const mapStateToProps = (state) => {
    return {
        mailboxes: state.mailboxes,
        usesMailgun: state.systemData.usesMailgun,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(MailboxesList);