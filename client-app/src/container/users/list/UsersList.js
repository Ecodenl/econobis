import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import UsersListItem from './UsersListItem';
import { connect } from 'react-redux';

class UsersList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van gebruikers.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.users.length === 0) {
            loadingText = 'Geen gebruikers gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Voornaam'} width={'20%'} />
                            <DataTableHeadTitle title={'Achternaam'} width={'25%'} />
                            <DataTableHeadTitle title={'E-mail'} width={'25%'} />
                            <DataTableHeadTitle title={'Status'} width={'5%'} />
                            <DataTableHeadTitle title={'Geblokkeerd tot'} width={'20%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={11}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.users.map(user => {
                                return <UsersListItem key={user.id} {...user} />;
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

export default connect(mapStateToProps)(UsersList);
