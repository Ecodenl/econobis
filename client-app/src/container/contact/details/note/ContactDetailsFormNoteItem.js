import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ContactNoteAPI from '../../../../api/contact/ContactNoteAPI';
import * as contactDetailsActions from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormNoteView from './ContactDetailsFormNoteView';
import ContactDetailsFormNoteEdit from './ContactDetailsFormNoteEdit';
import ContactDetailsFormNoteDelete from './ContactDetailsFormNoteDelete';

class ContactDetailFormNoteItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            note: {
                id: props.note.id,
                note: props.note.note,
                createdAt: props.note.createdAt ? moment(props.note.createdAt.date).format('DD-MM-Y') : '',
                createdBy: props.note.createdBy
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            note: {
                id: this.props.note.id,
                note: this.props.note.note,
                createdAt: this.props.note.createdAt ? moment(this.props.note.createdAt.date).format('DD-MM-Y') : '',
                createdBy: this.props.note.createdBy
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    handleInputChange = event => {
        this.setState({
            ...this.state,
            note: {
                ...this.state.note,
                note: event.target.value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { note } = this.state;

        ContactNoteAPI.updateNote(note).then((payload) => {
            this.props.dispatch(contactDetailsActions.updateNote(payload));
            this.closeEdit();
        });
    };

    render() {
        return (
            <div className="margin-10-top item-border">
                <ContactDetailsFormNoteView
                    note={this.state.note}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormNoteEdit
                        note={this.state.note}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        errorType={this.state.errorType}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormNoteDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.note}
                    />
                }
            </div>
        );
    }
};

export default connect()(ContactDetailFormNoteItem);