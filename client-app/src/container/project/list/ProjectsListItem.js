import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

class ProjectsListItem extends Component {
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
        hashHistory.push(`project/${id}`);
    }

    render() {
        const {
            id,
            code,
            name,
            projectType,
            projectTypeCodeRef,
            totalParticipations,
            participationsDefinitive,
            amountOfLoanNeeded,
            amountDefinitive,
        } = this.props;
        const participationsAvailable = totalParticipations - participationsDefinitive;
        const amountAvailable = amountOfLoanNeeded - amountDefinitive;

        // Calculate percentage issued
        let definitiveIssuedPercentage = 0;
        if (projectTypeCodeRef === 'loan') {
            if (amountOfLoanNeeded && amountDefinitive) {
                definitiveIssuedPercentage = (amountDefinitive / amountOfLoanNeeded) * 100;
            }
        } else {
            if (totalParticipations && participationsDefinitive) {
                definitiveIssuedPercentage = (participationsDefinitive / totalParticipations) * 100;
            }
        }

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{code}</td>
                <td>{name}</td>
                <td>{projectType}</td>
                <td>{projectTypeCodeRef !== 'loan' ? totalParticipations : '-'}</td>
                <td>{projectTypeCodeRef !== 'loan' ? participationsDefinitive : '-'}</td>
                <td>{projectTypeCodeRef !== 'loan' ? participationsAvailable : '-'}</td>
                <td>{projectTypeCodeRef === 'loan' ? amountOfLoanNeeded : '-'}</td>
                <td>{projectTypeCodeRef === 'loan' ? amountDefinitive : '-'}</td>
                <td>{projectTypeCodeRef === 'loan' ? amountAvailable : '-'}</td>
                <td>{`${definitiveIssuedPercentage.toLocaleString('nl', { maximumFractionDigits: 2 })}%`}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageProject && false ? (
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

export default connect(mapStateToProps)(ProjectsListItem);
