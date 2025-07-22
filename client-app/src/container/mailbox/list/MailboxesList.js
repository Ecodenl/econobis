import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import MailboxesListItem from './MailboxesListItem';
import MailboxesListFilter from './MailboxesListFilter';

class MailboxesList extends Component {
    constructor(props) {
        super(props);
    }

    onSubmitFilter = () => {
        this.props.refreshData();
    };

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van mailboxen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.mailboxes.length === 0) {
            loadingText = 'Geen mailboxen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Weergavenaam'} width={'15%'} />
                            <DataTableHeadTitle title={'E-mail'} width={'15%'} />
                            {/*<DataTableHeadTitle title={'Gebruikersnaam'} width={'15%'} />*/}
                            <DataTableHeadTitle title={'Inkomend'} width={'15%'} />
                            {/*<DataTableHeadTitle title={'Gebruikt mailgun'} width={'10%'} />*/}
                            <DataTableHeadTitle title={'Uitgaand'} width={'15%'} />
                            <DataTableHeadTitle title={'Primair'} width={'5%'} />
                            <DataTableHeadTitle title={'Actief'} width={'5%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                        <MailboxesListFilter refreshData={this.props.refreshData} />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={7}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.mailboxes.map(mailbox => {
                                return <MailboxesListItem key={mailbox.id} {...mailbox} />;
                            })
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailboxes: state.mailboxes,
        usesMailgun: state.systemData.usesMailgun,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(MailboxesList);
