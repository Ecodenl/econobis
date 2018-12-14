import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DocumentTemplatesItem from './DocumentTemplatesItem';
import DocumentTemplatesDeleteItem from "./DocumentTemplatesDeleteItem";
import {connect} from "react-redux";


class DocumentTemplatesList extends Component {
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
            loadingText = 'Fout bij het ophalen van document templates.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.documentTemplates.length === 0) {
            loadingText = 'Geen document templates gevonden!';
        }
        else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Nummer'} width={"20%"}/>
                            <DataTableHeadTitle title={'Datum'} width={"30%"}/>
                            <DataTableHeadTitle title={'Template'} width={"30%"}/>
                            <DataTableHeadTitle title={'Type'} width={"8%"}/>
                            <DataTableHeadTitle title={'Actief'} width={"7%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            loading ? (
                                <tr>
                                    <td colSpan={6}>{loadingText}</td>
                                </tr>
                            ) : (
                                this.props.documentTemplates.map((template) => {
                                    return <DocumentTemplatesItem
                                        key={template.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...template}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <DocumentTemplatesDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        refreshDocumentTemplatesData={this.props.refreshDocumentTemplatesData}
                        {...this.state.deleteItem}
                    />
                }

            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(DocumentTemplatesList);