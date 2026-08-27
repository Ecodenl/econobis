import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const ProjectsListItemWrapper = props => {
    const navigate = useNavigate();
    return <ProjectsListItem {...props} navigate={navigate} />;
};

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
        this.props.navigate(`/project/${id}`);
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
                <td>{projectTypeCodeRef === 'loan' ? MoneyPresenter(amountOfLoanNeeded) : '-'}</td>
                <td>{projectTypeCodeRef === 'loan' ? MoneyPresenter(amountDefinitive) : '-'}</td>
                <td>{projectTypeCodeRef === 'loan' ? MoneyPresenter(amountAvailable) : '-'}</td>
                <td>{`${definitiveIssuedPercentage.toLocaleString('nl', { maximumFractionDigits: 2 })}%`}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons && this.props.permissions.manageProject && false ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
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

export default connect(mapStateToProps)(ProjectsListItemWrapper);
