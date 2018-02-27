import React, { Component } from 'react';

import DataTable from '../../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../../components/dataTable/DataTableBody';
import ParticipantsListHead from './ParticipantsListHead';
import ParticipantsListFilter from './ParticipantsListFilter';
import ParticipantsListItem from './ParticipantsListItem';
import DataTablePagination from "../../../../../components/dataTable/DataTablePagination";

class ParticipantsList extends Component {
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
        const { data = [], meta = {}, isLoading } = this.props.participantsProductionProject;

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <ParticipantsListHead
                            refreshParticipantsProductionProjectData={() => this.props.refreshParticipantsProductionProjectData()}
                        />
                        <ParticipantsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            data.length === 0 ? (
                                <tr><td colSpan={12}>Geen participanten gevonden!</td></tr>
                            ) : (
                                data.map((participantProductionProject) => {
                                    return <ParticipantsListItem
                                        key={participantProductionProject.id}
                                        {...participantProductionProject}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
                <div className="col-md-4 col-md-offset-4">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.participantsProductionProjectPagination.page}
                    />
                </div>
            </form>
        );
    };
}

export default ParticipantsList;
