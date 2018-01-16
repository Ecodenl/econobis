import React, {Component} from 'react';

import EmailDetailsAttachmentView from './EmailDetailsAttachmentView';

class EmailDetailsAttachmentsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',

            attachment: {
                ...props.attachment,
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
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <EmailDetailsAttachmentView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    attachment={this.state.attachment}
                />
            </div>
        );
    }
};

export default EmailDetailsAttachmentsItem;
