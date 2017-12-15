import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import UsersListItem from './UsersListItem';

const UsersList = props => {
    return (
        <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Voornaam'} width={"30%"}/>
                            <DataTableHeadTitle title={'Achternaam'} width={"25%"} />
                            <DataTableHeadTitle title={'Email'} width={"30%"} />
                            <DataTableHeadTitle title={'Status'} width={"10%"} />
                            <DataTableHeadTitle title={''} width={"5%"} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            props.users.length === 0 ? (
                                <tr><td colSpan={11}>Geen gebruikers gevonden!</td></tr>
                            ) : (
                                props.users.map((user) => {
                                    return <UsersListItem
                                        key={user.id}
                                        {...user}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
        </div>
    );
};

export default UsersList;