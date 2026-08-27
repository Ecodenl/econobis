import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import TeamsListItem from './TeamsListItem';
import TeamDeleteItem from './TeamDeleteItem';
import { connect } from 'react-redux';

class TeamsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            },
        };
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id,
                name,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                name: '',
            },
        });
    };

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van teams.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.teams.length === 0) {
            loadingText = 'Geen teams gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Team'} width={'30%'} />
                            <DataTableHeadTitle title={'Gebruikers'} width={'54%'} />
                            <DataTableHeadTitle title={'Groepen'} width={'7%'} />
                            <DataTableHeadTitle title={'Documenten'} width={'7%'} />
                            <DataTableHeadTitle title={'Afspraak kalenders'} width={'7%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.teams.map(team => {
                                return (
                                    <TeamsListItem
                                        key={team.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...team}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>

                {this.state.showDeleteItem && (
                    <TeamDeleteItem closeDeleteItemModal={this.closeDeleteItemModal} {...this.state.deleteItem} />
                )}
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

export default connect(mapStateToProps)(TeamsList);
