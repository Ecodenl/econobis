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
        const {
            id,
            revenueId,
            confirmed,
            status,
            dateBegin,
            dateEnd,
            dateConfirmed,
            payoutKwh,
            isLastRevenuePartsKwh,
            dateBeginRevenuesKwh,
            nextRevenuePartsKwh,
        } = props.revenuePartsKwh;
        const { allowEditStart, kwhStart, kwhStartHigh, kwhStartLow } = props.revenuePartsKwh.valuesKwhStart;
        const { allowEditEnd, kwhEnd, kwhEndHigh, kwhEndLow } = props.revenuePartsKwh.valuesKwhEnd;

        this.state = {
            showModalUpdate: false,
            showModalDefinitive: false,
            revenuePartsKwh: {
                id,
                revenueId: revenueId,
                confirmed: !!confirmed,
                status: status,
                dateBegin: dateBegin ? moment(dateBegin).format('Y-MM-DD') : '',
                dateEnd: dateEnd ? moment(dateEnd).format('Y-MM-DD') : '',
                dateConfirmed: dateConfirmed ? moment(dateConfirmed).format('Y-MM-DD') : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(5) : '',
                isLastRevenuePartsKwh: !!isLastRevenuePartsKwh,
                dateBeginRevenuesKwh: dateBeginRevenuesKwh ? moment(dateBeginRevenuesKwh).format('Y-MM-DD') : '',
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
            nextRevenuePartsKwh: nextRevenuePartsKwh,
            errors: {
                dateEnd: false,
                payoutKwh: false,
                kwhEndHigh: false,
                kwhEndLow: false,
            },
            errorMessage: {
                dateEnd: '',
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

    toggleShowModalUpdate = () => {
        this.setState({
            showModalUpdate: !this.state.showModalUpdate,
        });
    };

    toggleShowModalDefinitive = () => {
        this.setState({
            showModalDefinitive: !this.state.showModalDefinitive,
        });
    };

    cancelSetDate = () => {
        this.setState({
            ...this.state,
            revenuePartsKwh: {
                ...this.state.revenuePartsKwh,
                dateConfirmed: '',
                confirmed: false,
            },
        });

        this.setState({
            showModalDefinitive: false,
        });
    };

    cancelUpdate = () => {
        this.setState({
            showModalUpdate: false,
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

    handleInputChangeDate = (value, name) => {
        if (value) {
            this.setState({
                ...this.state,
                revenuePartsKwh: {
                    ...this.state.revenuePartsKwh,
                    [name]: value,
                },
            });
        }
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
            this.toggleShowModalDefinitive();
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

    confirmUpdate = event => {
        event.preventDefault();

        const { revenuePartsKwh } = this.state;
        const { nextRevenuePartsKwh } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        // if (validator.isEmpty(revenuePartsKwh.dateBegin + '')) {
        //     errors.dateBegin = true;
        //     errorMessage.dateBegin = 'Verplicht';
        //     hasErrors = true;
        // }
        if (revenuePartsKwh.isLastRevenuePartsKwh) {
            if (validator.isEmpty(revenuePartsKwh.dateEnd + '')) {
                errors.dateEnd = true;
                errorMessage.dateEnd = 'Verplicht';
                hasErrors = true;
            }
            if (!hasErrors && revenuePartsKwh.dateEnd < revenuePartsKwh.dateBegin) {
                errors.dateEnd = true;
                errorMessage.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
                hasErrors = true;
            }
        }

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

        if (nextRevenuePartsKwh && nextRevenuePartsKwh.status != 'new') {
            if (
                (revenuePartsKwh.valuesKwh.kwhEndHigh ? parseFloat(revenuePartsKwh.valuesKwh.kwhEndHigh) : 0) >
                (nextRevenuePartsKwh.valuesKwhEnd.kwhEndHigh
                    ? parseFloat(nextRevenuePartsKwh.valuesKwhEnd.kwhEndHigh)
                    : 0)
            ) {
                errors.kwhEndHigh = true;
                errorMessage.kwhEndHigh =
                    'Eindstand kWh hoog mag niet hoger zijn dan Eindstand kWh hoog volgende periode.';
                hasErrors = true;
            }
            if (
                (revenuePartsKwh.valuesKwh.kwhEndLow ? parseFloat(revenuePartsKwh.valuesKwh.kwhEndLow) : 0) >
                (nextRevenuePartsKwh.valuesKwhEnd.kwhEndLow
                    ? parseFloat(nextRevenuePartsKwh.valuesKwhEnd.kwhEndLow)
                    : 0)
            ) {
                errors.kwhEndLow = true;
                errorMessage.kwhEndLow =
                    'Eindstand kWh laag mag niet lager zijn dan Eindstand kWh laag volgende periode.';
                hasErrors = true;
            }
        }

        if (!revenuePartsKwh.payoutKwh) {
            errors.payoutKwh = true;
            errorMessage.payoutKwh = 'Verplicht';
            hasErrors = true;
        }

        revenuePartsKwh.payoutKwh = revenuePartsKwh.payoutKwh ? parseFloat(revenuePartsKwh.payoutKwh).toFixed(5) : '';

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (!hasErrors) {
            this.toggleShowModalUpdate();
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            ...this.state,
            showModalUpdate: false,
        });

        const { revenuePartsKwh } = this.state;
        this.setState({ isSaving: true });
        RevenuePartsKwhAPI.updateRevenuePartsKwh(revenuePartsKwh.id, revenuePartsKwh).then(payload => {
            this.props.fetchRevenuePartsKwh(revenuePartsKwh.id);

            setTimeout(() => {
                this.props.getDistributionPartsKwh(revenuePartsKwh.id, 0, '');
            }, 250);
            // this.setState({ isSaving: true });
            this.props.switchToView();
        });
    };

    render() {
        const {
            confirmed,
            status,
            dateBegin,
            dateEnd,
            dateConfirmed,
            payoutKwh,
            isLastRevenuePartsKwh,
            dateBeginRevenuesKwh,
        } = this.state.revenuePartsKwh;
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
                    <InputDate
                        label={'Eind periode'}
                        name={'dateEnd'}
                        value={dateEnd}
                        readOnly={!isLastRevenuePartsKwh}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateEnd}
                        errorMessage={this.state.errorMessage.dateEnd}
                        disabledBefore={dateBegin}
                        disabledAfter={moment(dateBeginRevenuesKwh)
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
                        {allowEditStart || allowEditEnd || status == 'concept' || status == 'concept-to-update' ? (
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.confirmUpdate}
                                type={'submit'}
                                value={'Submit'}
                                loading={this.state.isSaving}
                            />
                        ) : null}
                    </div>
                </PanelFooter>
                {this.state.showModalUpdate && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        closeModal={this.cancelUpdate}
                        confirmAction={this.handleSubmit}
                        title="Bevestigen"
                    >
                        <p>
                            Het bijwerken van de opbrengst periode verdeling kan enige tijd duren, vooral bij veel
                            deelnemers. Dit proces gebeurd daarom op de achtergrond. Zolang deze opbrengst periode
                            verdeling wordt bijgewerkt kunnen er verder geen wijzigingen of acties op uitgevoerd worden
                            op deze opbrengst periode verdeling.
                            <br />
                            Als er eindstanden zijn gewijzigd en er is een volgende periode aanwezig, dan zal deze ook
                            direct bijgewerkt worden. De eindstanden van deze opbrengst periode verdeling zijn namelijk
                            de beginstanden van de volgende opbrengst periode verdeling.
                            <br />
                        </p>
                    </Modal>
                )}
                {this.state.showModalDefinitive && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        closeModal={this.cancelSetDate}
                        confirmAction={this.toggleShowModalDefinitive}
                        title="Bevestigen"
                    >
                        <p>
                            Als je deze datum invult zullen deze opbrengst kwh standen en van alle voorgaande perioden
                            definitief worden gemaakt. Je kunt deze hierna niet meer aanpassen.
                        </p>
                        {isLastRevenuePartsKwh && (
                            <p>
                                Dit is de laatste deelperiode. Met het definitief maken van deze periode zal de totale
                                opbrengst verdeling definitief worden gemaakt.
                            </p>
                        )}
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
