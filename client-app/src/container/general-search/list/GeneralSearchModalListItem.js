import React, { Component } from 'react';
import {hashHistory, Link} from "react-router";

class GeneralSearchModalListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    };

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    };

    redirect(){
        hashHistory.push(this.props.redirect);
        this.props.closeModal();
    }

    render() {
        const {relation, found_in, found_value} = this.props;

        return (
            <tr className={this.state.highlightRow} onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}>
                <td><Link className="link-underline" onClick={() => this.redirect()}> {relation}</Link></td>
                <td>{found_in}</td>
                <td>{found_value}</td>
            </tr>

        );
    }
}

export default GeneralSearchModalListItem;