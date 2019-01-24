import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import MailgunDomainsListItem from './MailgunDomainsListItem';
import { connect } from 'react-redux';

class MailgunDomainsList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van mailgun domeinen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.mailgunDomains.length === 0) {
            loadingText = 'Geen mailgun domeinen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Domeinnaam'} width={'50%'} />
                            <DataTableHeadTitle title={'Geverifieerd'} width={'45%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={3}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.mailgunDomains.map(mailgunDomain => {
                                return <MailgunDomainsListItem key={mailgunDomain.id} {...mailgunDomain} />;
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
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(MailgunDomainsList);
