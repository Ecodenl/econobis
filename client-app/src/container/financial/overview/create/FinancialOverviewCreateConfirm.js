import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import { hashHistory } from 'react-router';
import fileDownload from 'js-file-download';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';

class FinancialOverviewCreateConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    confirmAction = event => {
        event.preventDefault();
        this.setState({
            loading: true,
        });

        FinancialOverviewContactAPI.sendAll(
            this.props.financialOverviewId,
            this.props.financialOverviewContactIds,
            null
        ).then(payload => {
            if (payload && payload.headers && payload.headers['x-filename']) {
                fileDownload(payload.data, payload.headers['x-filename']);
            }
        });

        hashHistory.push(`/waardestaat/${this.props.financialOverviewId}`);
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Waardestaten verzenden"
                buttonConfirmText={'Verzenden'}
                loading={this.state.loading}
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Wilt u alle definitieve waardestaten verzenden?</span>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(FinancialOverviewCreateConfirm);
