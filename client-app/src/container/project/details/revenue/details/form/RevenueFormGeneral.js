import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';

import RevenueFormEdit from './RevenueFormEdit';
import RevenueFormView from './RevenueFormView';
import RevenueFormSetConfirmModal from './RevenueFormSetConfirmModal';

import ErrorModal from '../../../../../../components/modal/ErrorModal';

class RevenueFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showModalConfirm: false,
            activeDiv: '',
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    setConfirmModal = () => {
        this.setState({
            showModalConfirm: true,
        });
    };
    closeModalConfirm = () => {
        this.setState({
            showModalConfirm: false,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    setErrorModal = errorMessage => {
        this.setState({
            showErrorModal: true,
            modalErrorMessage: errorMessage,
        });
    };
    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    <>
                        {this.state.showEdit &&
                        !this.props.revenue.confirmed &&
                        this.props.permissions.manageProject ? (
                            <RevenueFormEdit switchToView={this.switchToView} />
                        ) : (
                            <RevenueFormView switchToEdit={this.switchToEdit} setConfirmModal={this.setConfirmModal} />
                        )}
                        {this.state.showModalConfirm &&
                        !this.props.revenue.confirmed &&
                        this.props.permissions.manageProject ? (
                            <RevenueFormSetConfirmModal
                                // revenue={this.props.revenue}
                                closeModalConfirm={this.closeModalConfirm}
                                setErrorModal={this.setErrorModal}
                                closeDeleteItemModal={this.toggleTerminate}
                            />
                        ) : null}
                        {this.state.showErrorModal && (
                            <ErrorModal
                                closeModal={this.closeErrorModal}
                                title={'Fout bij opslaan'}
                                errorMessage={this.state.modalErrorMessage}
                            />
                        )}
                    </>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        revenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueFormGeneral);
