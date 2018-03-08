import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostalCodeLinkEditForm from "./PostalCodeLinkEditForm";

class PostalCodeLinkListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showActionButtons: false,
            highlightRow: '',
        };
    }

    toggleShowEdit = () => {
        this.setState({
            showEdit: !this.state.showEdit,
        })
    };

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

    render() {
        const {id, postalCodeMain, postalCodeLink} = this.props;
        if (!this.state.showEdit) {
            return (
                <tr className={this.state.highlightRow}
                    onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                    <td>{postalCodeMain}</td>
                    <td>{postalCodeLink}</td>
                    <td>
                        {(this.state.showActionButtons ? <a role="button" onClick={this.toggleShowEdit}><span
                            className="glyphicon glyphicon-pencil mybtn-success"/> </a> : '')}
                        {(this.state.showActionButtons ?
                            <a role="button"
                               onClick={this.props.showDeleteItemModal.bind(this, id, postalCodeMain, postalCodeLink)}><span
                                className="glyphicon glyphicon-trash mybtn-danger"/> </a> : '')}
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td colSpan="3">
                        <PostalCodeLinkEditForm
                            postalCodeLink={this.props}
                            toggleShowEdit={this.toggleShowEdit}
                            refreshPostalCodeLinksData={this.props.refreshPostalCodeLinksData}
                        />
                    </td>
                </tr>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps, null)(PostalCodeLinkListItem);