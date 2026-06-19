import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDocuments, clearDocuments } from '../../../actions/document/DocumentsActions';
import DocumentsListToolbar from './DocumentsListToolbar';
import DocumentsList from './DocumentsList';
import filterHelper from '../../../helpers/FilterHelper';
import { setDocumentsPagination } from '../../../actions/document/DocumentsPaginationActions';
import { clearFilterDocuments } from '../../../actions/document/DocumentFiltersActions';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';

const DocumentsListAppWrapper = props => {
    return <DocumentsListApp {...props} />;
};

class DocumentsListApp extends Component {
    constructor(props) {
        super(props);

        this.fetchDocumentsData = this.fetchDocumentsData.bind(this);
        this.resetDocumentsFilters = this.resetDocumentsFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchDocumentsData();
    }

    componentWillUnmount() {
        this.props.clearDocuments();
    }

    resetDocumentsFilters() {
        this.props.clearFilterDocuments();

        this.fetchDocumentsData();
    }

    onSubmitFilter() {
        this.props.clearDocuments();

        this.props.setDocumentsPagination({ page: 0, offset: 0 });

        this.fetchDocumentsData();
    }

    fetchDocumentsData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.documentsFilters);
            const sorts = this.props.documentsSorts;
            const pagination = { limit: 20, offset: this.props.documentsPagination.offset };

            this.props.fetchDocuments(filters, sorts, pagination);
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setDocumentsPagination({ page, offset });

        this.fetchDocumentsData();
    }

    render() {
        return (
            <div>
                <div className="panel panel-default col-md-12">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <DocumentsListToolbar resetDocumentsFilters={() => this.resetDocumentsFilters()} />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <DocumentsList
                                handlePageClick={this.handlePageClick}
                                documents={this.props.documents}
                                documentsPagination={this.props.documentsPagination}
                                onSubmitFilter={() => this.onSubmitFilter()}
                                fetchDocumentsData={() => this.fetchDocumentsData()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documents: state.documents.list,
        documentsPagination: state.documents.pagination,
        documentsFilters: state.documents.filters,
        documentsSorts: state.documents.sorts,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchDocuments, clearDocuments, clearFilterDocuments, setDocumentsPagination },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListAppWrapper);
