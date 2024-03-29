import React, { Component } from 'react';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import ParticipantsListHead from './ParticipantsListHead';
import ParticipantsListFilter from './ParticipantsListFilter';
import ParticipantsListItem from './ParticipantsListItem';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        const { data = [], meta = {} } = this.props.participantsProject;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van deelnemers.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen deelnemers gevonden!';
        } else {
            loading = false;
        }

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <ParticipantsListHead
                            refreshParticipantsProjectData={() => this.props.refreshParticipantsProjectData()}
                            projectTypeRef={this.props.projectTypeRef}
                        />
                        <ParticipantsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                            toggleCheckedAll={this.props.toggleCheckedAll}
                            showCheckboxList={this.props.showCheckboxList}
                            checkedAll={this.props.checkedAll}
                            projectTypeRef={this.props.projectTypeRef}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={this.props.projectTypeRef === 'postalcode_link_capital' ? 11 : 10}>
                                    {loadingText}
                                </td>
                            </tr>
                        ) : (
                            data.map(participantProject => {
                                return (
                                    <ParticipantsListItem
                                        key={participantProject.id}
                                        showCheckboxList={this.props.showCheckboxList}
                                        checkedAll={this.props.checkedAll}
                                        toggleParticipantCheck={this.props.toggleParticipantCheck}
                                        projectTypeRef={this.props.projectTypeRef}
                                        participantIds={this.props.participantIds}
                                        {...participantProject}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-4 col-md-offset-4">
                    <DataTablePagination
                        // todo Hier juiste records per page nog zetten (origineel 20: voor testen op 4)!
                        recordsPerPage={20}
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.participantsProjectPagination.page}
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ParticipantsList);
