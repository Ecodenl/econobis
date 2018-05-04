import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import TeamsListItem from './TeamsListItem';
import TeamDeleteItem from "./TeamDeleteItem";

class TeamsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            }
        };
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                name: '',
            }
        });
    };

    render() {
        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Team'} width={"30%"}/>
                            <DataTableHeadTitle title={'Gebruikers'} width={"65%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.teams.length === 0 ? (
                                <tr>
                                    <td colSpan={3}>Geen teams gevonden!</td>
                                </tr>
                            ) : (
                                this.props.teams.map((team) => {
                                    return <TeamsListItem
                                        key={team.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...team}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <TeamDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

export default TeamsList;