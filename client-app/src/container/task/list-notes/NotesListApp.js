import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchNotes, clearNotes } from '../../../actions/task/NotesActions';
import { clearFilterNotes } from '../../../actions/task/NotesFiltersActions';
import { setNotesPagination } from '../../../actions/task/NotesPaginationActions';
import NotesList from './NotesList';
import NotesListToolbar from './NotesListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";

class NotesListApp extends Component {
    constructor(props) {
        super(props);

        this.fetchNotesData = this.fetchNotesData.bind(this);
        this.resetNoteFilters = this.resetNoteFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchNotesData();
    };

    componentWillUnmount() {
        this.props.clearNotes();
    };

    fetchNotesData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.notesFilters);
            const sorts = this.props.notesSorts.reverse();
            const pagination = { limit: 20, offset: this.props.notesPagination.offset };

            //this.props.clearContacts();
            this.props.fetchNotes(filters, sorts, pagination);
        },100 );
    };

    resetNoteFilters() {
        this.props.clearFilterNotes();

        this.fetchNotesData();
    };

    onSubmitFilter() {
        this.props.clearNotes();

        this.props.setNotesPagination({page: 0, offset: 0});

        this.fetchNotesData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setNotesPagination({page, offset});

        this.fetchNotesData();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <NotesListToolbar
                            resetNoteFilters={() => this.resetNoteFilters()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <NotesList
                            notes={this.props.notes}
                            notesPagination={this.props.notesPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            fetchNotesData={() => this.fetchNotesData()}
                            handlePageClick={this.handlePageClick}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes.list,
        notesFilters: state.notes.filters,
        notesSorts: state.notes.sorts,
        notesPagination: state.notes.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchNotes, clearNotes, clearFilterNotes, setNotesPagination }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesListApp);