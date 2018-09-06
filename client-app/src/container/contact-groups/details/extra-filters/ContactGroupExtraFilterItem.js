import React, {Component} from 'react';

import ContactGroupExtraFilterView from './ContactGroupExtraFilterView';

class ContactGroupExtraFilterItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
        };
    };

    onLineEnter = () => {
        this.setState({
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
                <ContactGroupExtraFilterView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    extraFilter={this.props.extraFilter}
                />
            </div>
        );
    }
};

export default ContactGroupExtraFilterItem;
