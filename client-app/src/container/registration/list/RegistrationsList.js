import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import RegistrationsListHead from './RegistrationsListHead';
import RegistrationsListFilter from './RegistrationsListFilter';
import RegistrationsListItem from './RegistrationsListItem';

class RegistrationsList extends Component {
    constructor(props){
        super(props);
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <RegistrationsListHead
                            refreshRegistrationsData={() => this.props.refreshRegistrationsData()}
                        />
                        <RegistrationsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.registrations.length === 0 ? (
                                <tr><td colSpan={7}>Geen aanmeldingen gevonden!</td></tr>
                            ) : (
                                this.props.registrations.map((registration) => {
                                    return <RegistrationsListItem
                                        key={registration.id}
                                        {...registration}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
            </form>
        );
    };
}

export default RegistrationsList;