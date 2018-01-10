import React, {Component} from 'react';

import ConceptAttachmentsView from './ConceptAttachmentsView';
import ConceptAttachmentsItemDelete from "./ConceptAttachmentsItemDelete";

class ConceptAttachmentsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
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

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <EmailAttachmentsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    attachment={this.props.attachment}
                />
                {
                    this.state.showDelete &&
                    <ConceptAttachmentsItemDelete
                        toggleDelete={this.toggleDelete}
                        attachment={this.props.attachment}
                    />
                }
            </div>
        );
    }
};

export default ConceptAttachmentsItem;
