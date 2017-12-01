import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RegistrationDetailsAPI from '../../../../api/registration/RegistrationDetailsAPI';
import * as registrationDetailsActions from '../../../../actions/registration/RegistrationDetailsActions';
import RegistrationDetailsFormNoteView from './RegistrationDetailsFormNoteView';
import RegistrationDetailsFormNoteEdit from './RegistrationDetailsFormNoteEdit';
import RegistrationDetailsFormNoteDelete from './RegistrationDetailsFormNoteDelete';

class RegistrationDetailFormNoteItem extends Component {
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

        RegistrationDetailsAPI.updateRegistrationNote(note).then((payload) => {
            this.props.dispatch(registrationDetailsActions.updateRegistrationNote(payload));
            this.closeEdit();
        });
    };

    render() {
        return (
            <div className="extra-space-above item-border">
                <RegistrationDetailsFormNoteView
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
                    <RegistrationDetailsFormNoteEdit
                        note={this.state.note}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        errorType={this.state.errorType}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <RegistrationDetailsFormNoteDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.note}
                    />
                }
            </div>
        );
    }
};

export default connect()(RegistrationDetailFormNoteItem);