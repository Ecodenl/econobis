import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';

import DocumentsListItem from './DocumentsListItem';
import DocumentsDeleteItem from './DocumentsDeleteItem';
import DocumentsListHead from "./DocumentsListHead";
import DocumentsListFilter from "./DocumentsListFilter";

class DocumentsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                filename: '',
            }
        };

    }

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, filename) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                filename
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
                filename: '',
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.documents;

        return (
        <div>
            <form onKeyUp={this.handleKeyUp}>
            <DataTable>
                <DataTableHead>
                    <DocumentsListHead
                        fetchDocumentsData={() => this.props.fetchDocumentsData()}
                    />
                    <DocumentsListFilter
                        onSubmitFilter={this.props.onSubmitFilter}
                    />
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={7}>Geen documenten gevonden!</td>
                            </tr>
                        ) : (
                            data.map(document => (
                                <DocumentsListItem
                                    key={document.id}
                                    {...document}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                />
                            ))
                        )
                    }
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <ReactPaginate
                    onPageChange={this.props.handlePageClick}
                    pageCount={ Math.ceil(meta.total / 20) || 1 }
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    breakLabel={<a>...</a>}
                    breakClassName={"break-me"}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousLabel={<span aria-hidden="true">&laquo;</span>}
                    nextLabel={<span aria-hidden='true'>&raquo;</span>}
                    initialPage={this.props.documentsPagination.page || 0}
                    forcePage={this.props.documentsPagination.page}
                />
            </div>
            <div className="col-md-3">
                <div className="pull-right">Resultaten: { meta.total || 0 }</div>
            </div>
            </form>
            {
                this.state.showDeleteItem &&
                <DocumentsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    {...this.state.deleteItem}
                />
            }

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents.list,
        documentsPagination: state.documents.pagination,
    };
};

export default connect(mapStateToProps, null)(DocumentsList);

