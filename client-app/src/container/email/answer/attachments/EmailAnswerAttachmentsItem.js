import React, { Component } from 'react';

import EmailAnswerAttachmentsView from './EmailAnswerAttachmentsView';
import EmailAnswerAttachmentsDelete from './EmailAnswerAttachmentsDelete';

class EmailAnswerAttachmentsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
        };
    }

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

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <EmailAnswerAttachmentsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    attachment={this.props.attachment}
                />
                {this.state.showDelete && (
                    <EmailAnswerAttachmentsDelete
                        toggleDelete={this.toggleDelete}
                        attachment={this.props.attachment}
                        deleteAttachment={this.props.deleteAttachment}
                    />
                )}
            </div>
        );
    }
}

export default EmailAnswerAttachmentsItem;
