import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../../../components/form/InputText';
import InputDate from '../../../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../../../components/panel/PanelFooter';

import {
    fetchRevenuePartsKwh,
    getDistributionPartsKwh,
} from '../../../../../../../../actions/project/ProjectDetailsActions';
import Modal from '../../../../../../../../components/modal/Modal';
import ViewText from '../../../../../../../../components/form/ViewText';
import RevenuePartsKwhAPI from '../../../../../../../../api/project/RevenuePartsKwhAPI';

class RevenuePartsKwhFormEdit extends Component {
    constructor(props) {
        super(props);
        const { id, confirmed, status, dateBegin, dateEnd, dateConfirmed, payoutKwh } = props.revenuePartsKwh;
        const { allowEditStart, kwhStart, kwhStartHigh, kwhStartLow } = props.revenuePartsKwh.valuesKwhStart;
        const { allowEditEnd, kwhEnd, kwhEndHigh, kwhEndLow } = props.revenuePartsKwh.valuesKwhEnd;

        this.state = {
            showModal: false,
            revenuePartsKwh: {
                id,
                confirmed: !!confirmed,
                status: status,
                dateBegin: dateBegin ? moment(dateBegin).format('Y-MM-DD') : '',
                dateEnd: dateEnd ? moment(dateEnd).format('Y-MM-DD') : '',
                dateConfirmed: dateConfirmed ? moment(dateConfirmed).format('Y-MM-DD') : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(5) : '',
                valuesKwh: {
                    allowEditStart: allowEditStart,
                    kwhStart: kwhStart,
                    kwhStartHigh: kwhStartHigh,
                    kwhStartLow: kwhStartLow,
                    allowEditEnd: allowEditEnd,
                    kwhEnd: kwhEnd,
                    kwhEndHigh: kwhEndHigh,
                    kwhEndLow: kwhEndLow,
                },
            },
            errors: {
                payoutKwh: false,
                kwhEndHigh: false,
                kwhEndLow: false,
            },
            errorMessage: {
                payoutKwh: '',
                kwhEndHigh: '',
                kwhEndLow: '',
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
            revenuePartsKwh: {
                ...this.state.revenuePartsKwh,
                [name]: value,
            },
        });
    };

    handleInputChangeValuesKwh = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenuePartsKwh: {
                ...this.state.revenuePartsKwh,
                valuesKwh: {
                    ...this.state.revenuePartsKwh.valuesKwh,
                    [name]: value,
                },
            },
        });

        setTimeout(() => {
            const kwhStart =
                (this.state.revenuePartsKwh.valuesKwh.kwhStartLow
                    ? parseFloat(this.state.revenuePartsKwh.valuesKwh.kwhStartLow)
                    : 0) +
                (this.state.revenuePartsKwh.valuesKwh.kwhStartHigh
                    ? parseFloat(this.state.revenuePartsKwh.valuesKwh.kwhStartHigh)
                    : 0);
            const kwhEnd =
                (this.state.revenuePartsKwh.valuesKwh.kwhEndLow
                    ? parseFloat(this.state.revenuePartsKwh.valuesKwh.kwhEndLow)
                    : 0) +
                (this.state.revenuePartsKwh.valuesKwh.kwhEndHigh
                    ? parseFloat(this.state.revenuePartsKwh.valuesKwh.kwhEndHigh)
                    : 0);
            const kwhTotal = kwhEnd - kwhStart;

            this.setState({
                ...this.state,
                revenuePartsKwh: {
                    ...this.state.revenuePartsKwh,
                    valuesKwh: {
                        ...this.state.revenuePartsKwh.valuesKwh,
                        kwhStart,
                        kwhEnd,
                        kwhTotal,
                    },
                },
            });
        }, 200);
    };

    handleInputChangeDateConfirmed = (value, name) => {
        if (value) {
            this.setState({
                ...this.state,
                revenuePartsKwh: {
                    ...this.state.revenuePartsKwh,
                    valuesKwh: {
                        ...this.state.revenuePartsKwh.valuesKwh,
                    },
                    [name]: value,
                    confirmed: true,
                },
            });
            this.toggleShowModal();
        } else {
            this.setState({
                ...this.state,
                revenuePartsKwh: {
                    ...this.state.revenuePartsKwh,
                    valuesKwh: {
                        ...this.state.revenuePartsKwh.valuesKwh,
                    },
                    [name]: value,
                    confirmed: false,
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { revenuePartsKwh } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        // if (validator.isEmpty(revenuePartsKwh.dateBegin + '')) {
        //     errors.dateBegin = true;
        //     errorMessage.dateBegin = 'Verplicht';
        //     hasErrors = true;
        // }
        // if (validator.isEmpty(revenuePartsKwh.dateEnd + '')) {
        //     errors.dateEnd = true;
        //     errorMessage.dateEnd = 'Verplicht';
        //     hasErrors = true;
        // }
        // if (!revenuePartsKwh.payoutKwh) {
        //     errors.payoutKwh = true;
        //     errorMessage.payoutKwh = 'Verplicht';
        //     hasErrors = true;
        // }
        //
        // if (!hasErrors && revenuePartsKwh.dateEnd < revenuePartsKwh.dateBegin) {
        //     errors.dateEnd = true;
        //     errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
        //     hasErrors = true;
        // }

        if (
            (revenuePartsKwh.valuesKwh.kwhEndHigh ? parseFloat(revenuePartsKwh.valuesKwh.kwhEndHigh) : 0) <
            (revenuePartsKwh.valuesKwh.kwhStartHigh ? parseFloat(revenuePartsKwh.valuesKwh.kwhStartHigh) : 0)
        ) {
            errors.kwhEndHigh = true;
            errorMessage.kwhEndHigh = 'Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog.';
            hasErrors = true;
        }
        if (
            (revenuePartsKwh.valuesKwh.kwhEndLow ? parseFloat(revenuePartsKwh.valuesKwh.kwhEndLow) : 0) <
            (revenuePartsKwh.valuesKwh.kwhStartLow ? parseFloat(revenuePartsKwh.valuesKwh.kwhStartLow) : 0)
        ) {
            errors.kwhEndLow = true;
            errorMessage.kwhEndLow = 'Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag.';
            hasErrors = true;
        }

        if (!revenuePartsKwh.payoutKwh) {
            errors.payoutKwh = true;
            errorMessage.payoutKwh = 'Verplicht';
            hasErrors = true;
        }

        revenuePartsKwh.payoutKwh = revenuePartsKwh.payoutKwh ? parseFloat(revenuePartsKwh.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            RevenuePartsKwhAPI.updateRevenuePartsKwh(revenuePartsKwh.id, revenuePartsKwh).then(payload => {
                this.props.fetchRevenuePartsKwh(revenuePartsKwh.id);

                setTimeout(() => {
                    this.props.getDistributionPartsKwh(revenuePartsKwh.id, 0);
                }, 250);
                this.setState({ isSaving: true });
                this.props.switchToView();
            });
        }
    };

    render() {
        const { confirmed, status, dateBegin, dateEnd, dateConfirmed, payoutKwh } = this.state.revenuePartsKwh;
        const {
            allowEditStart,
            kwhStart,
            kwhStartHigh,
            kwhStartLow,
            allowEditEnd,
            kwhEnd,
            kwhEndHigh,
            kwhEndLow,
        } = this.state.revenuePartsKwh.valuesKwh;
        const kwhTotal = kwhEnd - kwhStart;

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
                    <InputDate label={'Begin periode'} name={'dateBegin'} value={dateBegin} readOnly={true} />
                    <InputDate label={'Eind periode'} name={'dateEnd'} value={dateEnd} readOnly={true} />
                </div>
                <div className="row">
                    <InputDate
                        label={'Datum definitief'}
                        name={'dateConfirmed'}
                        value={dateConfirmed}
                        readOnly={status == 'new' || status == 'processed'}
                        onChangeAction={this.handleInputChangeDateConfirmed}
                    />
                </div>

                <div className="row">
                    <div className={'panel-part panel-heading'}>
                        <span className={'h5 text-bold'}>Opbrengst kWh</span>
                    </div>
                </div>

                <div className="row">
                    <InputDate label={'Datum beginstanden'} name={'dateBegin'} value={dateBegin} readOnly={true} />
                    <InputDate label={'Datum eindstanden'} name={'dateEnd'} value={dateEnd} readOnly={true} />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh hoog'}
                        name={'kwhStartHigh'}
                        value={kwhStartHigh}
                        readOnly={!allowEditStart}
                        onChangeAction={this.handleInputChangeValuesKwh}
                    />
                    <InputText
                        type={'number'}
                        label={'Eindstand kWh hoog'}
                        name={'kwhEndHigh'}
                        value={kwhEndHigh}
                        readOnly={!allowEditEnd}
                        onChangeAction={this.handleInputChangeValuesKwh}
                        error={this.state.errors.kwhEndHigh}
                        errorMessage={this.state.errorMessage.kwhEndHigh}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh laag'}
                        name={'kwhStartLow'}
                        value={kwhStartLow}
                        readOnly={!allowEditStart}
                        onChangeAction={this.handleInputChangeValuesKwh}
                    />
                    <InputText
                        type={'number'}
                        label={'Eindstand kWh laag'}
                        name={'kwhEndLow'}
                        value={kwhEndLow}
                        readOnly={!allowEditEnd}
                        onChangeAction={this.handleInputChangeValuesKwh}
                        error={this.state.errors.kwhEndLow}
                        errorMessage={this.state.errorMessage.kwhEndLow}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh'}
                        name={'kwhStart'}
                        value={kwhStart}
                        readOnly={true}
                    />
                    <InputText type={'number'} label={'Eindstand kWh'} name={'kwhEnd'} value={kwhEnd} readOnly={true} />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Opbrengst kWh €'}
                        name={'payoutKwh'}
                        value={
                            payoutKwh &&
                            payoutKwh.toLocaleString('nl', { minimumFractionDigits: 3, maximumFractionDigits: 5 })
                        }
                        readOnly={!allowEditEnd}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.payoutKwh}
                        errorMessage={this.state.errorMessage.payoutKwh}
                        required={'required'}
                    />
                    <InputText
                        type={'number'}
                        label={'Totaal productie kWh'}
                        name={'kwhTotal'}
                        value={kwhTotal}
                        readOnly={true}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        {allowEditStart || allowEditEnd || status == 'concept' ? (
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                                loading={this.state.isSaving}
                            />
                        ) : null}
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
                            Als je deze datum invult, zal de opbrengst kwh standen definitief worden gemaakt. Je kunt
                            deze hierna niet meer aanpassen
                        </p>
                    </Modal>
                )}
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRevenuePartsKwh: id => {
        dispatch(fetchRevenuePartsKwh(id));
    },
    // getParticipants: (id, page) => {
    //     dispatch(getParticipants({ id, page }));
    // },
    getDistributionPartsKwh: (id, page) => {
        dispatch(getDistributionPartsKwh({ id, page }));
    },
});

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePartsKwhFormEdit);
