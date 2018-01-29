import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDocuments, clearDocuments } from '../../../actions/document/DocumentsActions';
import { setDocumentsPagination } from '../../../actions/document/DocumentsPaginationActions';
import DocumentsListToolbar from './DocumentsListToolbar';
import DocumentsList from './DocumentsList';

class DocumentsListApp extends Component {
    constructor(props){
        super(props);

        this.fetchDocumentsData = this.fetchDocumentsData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    };

    componentDidMount() {
        this.fetchDocumentsData();
    };

    componentWillUnmount() {
        this.props.clearDocuments();
    };

    fetchDocumentsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.documentsPagination.offset };

            this.props.fetchDocuments(pagination);
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setDocumentsPagination({page, offset});

        this.fetchDocumentsData();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default col-md-10">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <DocumentsListToolbar/>
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <DocumentsList
                                handlePageClick={this.handlePageClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        documentsPagination: state.documents.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocuments: (pagination) => {
        dispatch(fetchDocuments(pagination));
    },
    clearDocuments: () => {
        dispatch(clearDocuments());
    },
    setDocumentsPagination: (pagination) => {
        dispatch(setDocumentsPagination(pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListApp);