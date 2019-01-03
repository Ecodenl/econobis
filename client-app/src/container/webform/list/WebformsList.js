import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import WebformsListItem from './WebformsListItem';
import WebformDeleteItem from "./WebformDeleteItem";
import {connect} from "react-redux";

class WebformsList extends Component {
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

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van webformulieren.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.webforms.length === 0) {
            loadingText = 'Geen webformulieren gevonden!';
        }
        else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={"30%"}/>
                            <DataTableHeadTitle title={'Sleutel'} width={"30%"}/>
                            <DataTableHeadTitle title={'Aanvragen per minuut'} width={"20%"}/>
                            <DataTableHeadTitle title={'Gemaakt op'} width={"15%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            loading ? (
                                <tr>
                                    <td colSpan={5}>{loadingText}</td>
                                </tr>
                            ) : (
                                this.props.webforms.map((team) => {
                                    return <WebformsListItem
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
                    <WebformDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(WebformsList);