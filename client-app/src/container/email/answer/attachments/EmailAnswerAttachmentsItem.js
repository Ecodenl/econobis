import React, {Component} from 'react';

import EmailAnswerAttachmentsView from './EmailAnswerAttachmentsView';

class EmailAnswerAttachmentsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
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
            </div>
        );
    }
};

export default EmailAnswerAttachmentsItem;
