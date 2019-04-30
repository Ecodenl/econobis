import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

class ProductionProjectsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`productie-project/${id}`);
    }

    render() {
        const {
            id,
            code,
            name,
            totalParticipations,
            powerKwAvailable,
            issuedParticipations,
            issuableParticipations,
            issuedParticipationsPercentage,
        } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{code}</td>
                <td>{name}</td>
                <td>{totalParticipations}</td>
                <td>{powerKwAvailable}</td>
                <td>{issuedParticipations}</td>
                <td>{issuableParticipations}</td>
                <td>{issuedParticipationsPercentage.toLocaleString('nl', { maximumFractionDigits: 2 })}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageProductionProject && false ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ProductionProjectsListItem);
