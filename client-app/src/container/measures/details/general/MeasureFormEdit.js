import React, { Component } from 'react';
import { connect } from 'react-redux';

import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import MeasureAPI from '../../../../api/measure/MeasureAPI';

import { fetchMeasure } from '../../../../actions/measure/MeasureDetailsActions';
import InputTextArea from '../../../../components/form/InputTextArea';
import InputToggle from '../../../../components/form/InputToggle';

class MeasureFormEdit extends Component {
    constructor(props) {
        super(props);

        const { id, description, visible, name_custom } = props.measureDetails;

        this.state = {
            measure: {
                id,
                description: description ? description : '',
                visible: visible ? visible : false,
                name_custom: name_custom ? name_custom : '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measure: {
                ...this.state.measure,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measure } = this.state;

        MeasureAPI.updateMeasure(measure.id, measure).then(payload => {
            this.props.fetchMeasure(measure.id);
            this.props.switchToView();
        });
    };

    render() {
        const { description, visible, name_custom } = this.state.measure;
        const { name, number, measureCategory = {} } = this.props.measureDetails;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={'Maatregel categorie'}
                        name={'measureCategory'}
                        value={measureCategory.name}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                    <InputText label={'Nummer'} name={'number'} value={number} readOnly={true} />
                </div>

                <div className="row">
                    <InputText
                        label={'Maatregel specifiek'}
                        name={'name'}
                        value={name}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                    <InputToggle
                        label={'Zichtbaar'}
                        name={'visible'}
                        value={visible}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Naam aangepast'}
                        name={'name_custom'}
                        value={name_custom}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={'Beschrijving'}
                        name={'description'}
                        value={description}
                        onChangeAction={this.handleInputChange}
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
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMeasure: id => {
        dispatch(fetchMeasure(id));
    },
});

const mapStateToProps = state => {
    return {
        measureDetails: state.measureDetails,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureFormEdit);
