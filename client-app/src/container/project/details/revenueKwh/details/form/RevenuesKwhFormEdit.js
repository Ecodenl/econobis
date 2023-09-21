import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../components/panel/PanelFooter';

import { fetchRevenuesKwh, getDistributionKwh } from '../../../../../../actions/project/ProjectDetailsActions';
import Modal from '../../../../../../components/modal/Modal';
import ViewText from '../../../../../../components/form/ViewText';
import RevenuesKwhAPI from '../../../../../../api/project/RevenuesKwhAPI';

class RevenuesKwhFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            distributionTypeId,
            confirmed,
            status,
            dateBegin,
            dateEnd,
            dateConfirmed,
            datePayout,
            payoutKwh,
        } = props.revenuesKwh;

        this.state = {
            showModal: false,
            revenuesKwh: {
                id,
                distributionTypeId: distributionTypeId,
                confirmed: !!confirmed,
                status: status,
                dateBegin: dateBegin ? moment(dateBegin).format('Y-MM-DD') : '',
                dateEnd: dateEnd ? moment(dateEnd).format('Y-MM-DD') : '',
                originalDateEnd: dateEnd ? moment(dateEnd).format('Y-MM-DD') : '',
                dateConfirmed: dateConfirmed ? moment(dateConfirmed).format('Y-MM-DD') : '',
                datePayout: datePayout ? moment(datePayout).format('Y-MM-DD') : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(5) : '',
            },
            errors: {
                dateBegin: false,
                dateEnd: false,
                payoutKwh: false,
            },
            errorMessage: {
                dateBegin: '',
                dateEnd: '',
                payoutKwh: '',
            },
            isSaving: false,
        };
    }

    statusText = status => {
        switch (status) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
            case 'concept-to-update':
                return 'Concept (bijwerken noodzakelijk)';
            case 'confirmed':
                return 'Definitief';
            case 'in-progress':
                return 'Bezig...';
            case 'in-progress-update':
                return 'Bezig met bijwerken...';
            case 'in-progress-report':
                return 'Bezig met rapportage...';
            case 'in-progress-process':
                return 'Bezig met verwerken...';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };

    toggleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    cancelSetDate = () => {
        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                dateConfirmed: '',
                datePayout: '',
                confirmed: false,
            },
        });

        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            revenuesKwh: {
                ...this.state.revenuesKwh,
                [name]: value,
            },
        });
    };

    handleInputChangeDateConfirmed = (value, name) => {
        if (value) {
            this.setState({
                ...this.state,
                revenuesKwh: {
                    ...this.state.revenuesKwh,
                    [name]: value,
                    confirmed: true,
                },
            });
            this.toggleShowModal();
        } else {
            this.setState({
                ...this.state,
                revenuesKwh: {
                    ...this.state.revenuesKwh,
                    [name]: value,
                    confirmed: false,
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { revenuesKwh } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(revenuesKwh.dateBegin + '')) {
            errors.dateBegin = true;
            errorMessage.dateBegin = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty(revenuesKwh.dateEnd + '')) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Verplicht';
            hasErrors = true;
        }
        if (!revenuesKwh.payoutKwh) {
            errors.payoutKwh = true;
            errorMessage.payoutKwh = 'Verplicht';
            hasErrors = true;
        }

        if (!hasErrors && revenuesKwh.dateEnd < revenuesKwh.dateBegin) {
            errors.dateEnd = true;
            errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
            hasErrors = true;
        }

        revenuesKwh.payoutKwh = revenuesKwh.payoutKwh ? parseFloat(revenuesKwh.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            RevenuesKwhAPI.updateRevenuesKwh(revenuesKwh.id, revenuesKwh).then(payload => {
                // this.props.fetchRevenuesKwh(revenuesKwh.id);

                setTimeout(() => {
                    this.props.fetchRevenuesKwh(revenuesKwh.id);
                    this.props.getDistributionKwh(revenuesKwh.id, 0);
                }, 250);
                this.setState({ isSaving: true });
                this.props.switchToView();
            });
        }
    };

    render() {
        const {
            confirmed,
            status,
            dateBegin,
            dateEnd,
            originalDateEnd,
            dateConfirmed,
            datePayout,
            payoutKwh,
        } = this.state.revenuesKwh;
        const project = this.props.revenuesKwh.project;
        const { hasNewPartsKwh } = this.props.revenuesKwh;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className={'panel-heading'}>
                        <span className={'h5 text-bold'}>Algemene informatie</span>
                    </div>
                </div>
                <div className="row">
                    <ViewText
                        label={'Status'}
                        value={status ? this.statusText(status) : ''}
                        className={'form-group col-sm-6'}
                    />
                    <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} className={'form-group col-sm-6'} />
                </div>
                <div className="row">
                    <InputDate
                        label={'Begin periode'}
                        name={'dateBegin'}
                        value={dateBegin}
                        // todo WM: voorlopig even niet wijzigbaar.
                        readOnly={true}
                        // onChangeAction={this.handleInputChangeDate}
                        // required={'required'}
                        // error={this.state.errors.dateBegin}
                        // errorMessage={this.state.errorMessage.dateBegin}
                        // disabledBefore={project.dateInterestBearingKwh}
                    />
                    <InputDate
                        label={'Eind periode'}
                        name={'dateEnd'}
                        value={dateEnd}
                        readOnly={confirmed}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateEnd}
                        errorMessage={this.state.errorMessage.dateEnd}
                        disabledBefore={originalDateEnd}
                        disabledAfter={moment(dateBegin)
                            .add(1, 'year')
                            .add(6, 'month')
                            .add(-1, 'day')
                            .format('Y-MM-DD')}
                    />
                </div>
                <div className="row">
                    <InputDate
                        label={'Datum definitief'}
                        name={'dateConfirmed'}
                        value={dateConfirmed}
                        // readOnly={status == 'new' || status == 'processed' || hasNewPartsKwh}
                        readOnly={true}
                        onChangeAction={this.handleInputChangeDateConfirmed}
                    />
                    <InputDate
                        label={'Uitkeringsdatum'}
                        name={'datePayout'}
                        value={datePayout}
                        // readOnly={status == 'new' || status == 'processed' || hasNewPartsKwh}
                        readOnly={true}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Teruggave EB per kWh €'}
                        name={'payoutKwh'}
                        value={
                            payoutKwh &&
                            payoutKwh.toLocaleString('nl', {
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 5,
                            })
                        }
                        readOnly={confirmed}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.payoutKwh}
                        errorMessage={this.state.errorMessage.payoutKwh}
                        required={'required'}
                    />
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                            loading={this.state.isSaving}
                        />
                    </div>
                </PanelFooter>
                {this.state.showModal && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        closeModal={this.cancelSetDate}
                        confirmAction={this.toggleShowModal}
                        title="Bevestigen"
                    >
                        <p>
                            Als je deze datum invult, zal de opbrengst kwh definitief worden gemaakt. Je kunt deze
                            hierna niet meer aanpassen
                        </p>
                    </Modal>
                )}
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRevenuesKwh: id => {
        dispatch(fetchRevenuesKwh(id));
    },
    // getParticipants: (id, page) => {
    //     dispatch(getParticipants({ id, page }));
    // },
    getDistributionKwh: (id, page) => {
        dispatch(getDistributionKwh({ id, page }));
    },
});

const mapStateToProps = state => {
    return {
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenuesKwhFormEdit);
