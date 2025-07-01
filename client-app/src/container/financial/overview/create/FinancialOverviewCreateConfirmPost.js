import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import InputDate from '../../../../components/form/InputDate';
import validator from 'validator';
import moment from 'moment/moment';

// Functionele wrapper voor de class component
const FinancialOverviewCreateConfirmPostWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewCreateConfirmPost {...props} navigate={navigate} />;
};

class FinancialOverviewCreateConfirmPost extends Component {
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
        FinancialOverviewContactAPI.sendAllPost(
            this.props.financialOverviewId,
            this.props.financialOverviewContactIds,
            null
        ).then(payload => {
            if (payload && payload.headers && payload.headers['x-filename']) {
                fileDownload(payload.data, payload.headers['x-filename']);
            }
        });

        this.props.navigate(`/waardestaat/${this.props.financialOverviewId}`);
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
                title="Waardestaten downloaden"
                buttonConfirmText={'Downloaden'}
                loading={this.state.loading}
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>
                            Wilt u alle geselecteerde definitieve waardestaten (
                            {this.props.financialOverviewContactIds.length}) downloaden en doorzetten naar status
                            verzonden?
                        </span>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default FinancialOverviewCreateConfirmPostWrapper;
