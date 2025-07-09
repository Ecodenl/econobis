import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';
import Modal from '../../../../components/modal/Modal';

// Functionele wrapper voor de class component
const FinancialOverviewListItemWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewListItem {...props} navigate={navigate} />;
};

class FinancialOverviewListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
            hasNoAccessToAdministrationModal: false,
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
        this.props.navigate(`/waardestaat/${id}`);
    }

    showHasNoAccessToAdministrationModal() {
        this.setState({
            hasNoAccessToAdministrationModal: true,
        });
    }

    closeHasNoAccessToAdministrationModal() {
        this.setState({
            hasNoAccessToAdministrationModal: false,
        });
    }

    render() {
        const { id, description, year, administration, definitive, statusId, dateProcessed, permissions } = this.props;

        // list of administration ids that the current user has access to
        const administrationIds = this.props.administrations.map(administration => administration.id);
        let hasAccessToAdministration = administrationIds.indexOf(administration.id) > -1;

        let status = '';
        switch (statusId) {
            case 'in-progress':
                status = 'Wordt aangemaakt...';
                break;
            case 'concept':
                status = 'Concept';
                break;
            case 'definitive':
                status = 'Definitief';
                break;
            case 'processed':
                status = 'Verwerkt';
                break;
        }

        const dateProcessedFormated = dateProcessed ? moment(dateProcessed).format('DD-MM-Y') : '';

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={
                    permissions.manageFinancial && hasAccessToAdministration
                        ? () => this.openItem(id)
                        : () => this.showHasNoAccessToAdministrationModal()
                }
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{description}</td>
                <td>{year}</td>
                <td>{administration && administration.name}</td>
                <td>{status}</td>
                <td>{dateProcessedFormated}</td>
                <td>
                    {this.state.showActionButtons && permissions.manageFinancial && hasAccessToAdministration ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    permissions.manageFinancial &&
                    !definitive &&
                    hasAccessToAdministration &&
                    statusId === 'concept' ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, description)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}

                    {this.state.hasNoAccessToAdministrationModal && (
                        <Modal
                            buttonCancelText="Ok"
                            closeModal={() => this.closeHasNoAccessToAdministrationModal()}
                            showConfirmAction={false}
                            title="Je hebt geen recht om deze administratie in te zien"
                        >
                            <>
                                Je hebt geen recht om deze administratie in te zien. Vraag je administrator/beheerder
                                jou toe te voegen aan deze administratie via instellingen > administraties
                            </>
                        </Modal>
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(FinancialOverviewListItemWrapper);
