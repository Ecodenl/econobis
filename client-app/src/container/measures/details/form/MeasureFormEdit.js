import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import MeasureAPI from '../../../../api/measure/MeasureAPI';

import { fetchMeasure } from '../../../../actions/measure/MeasureActions';

class MeasureFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, name, number, description} = props.measure;

        this.state = {
            measure: {
                id,
                name,
                number,
                description: description ? description : '',
            },
            errors: {
                name: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measure: {
                ...this.state.measure,
                [name]: value
            },
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const {measure} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(measure.name)){
            errors.name = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        MeasureAPI.updateMeasure(measure.id, measure).then(payload => {
            this.props.fetchMeasure(measure.id);
            this.props.switchToView();
        });
    };

    render() {
        const {id, name, number, description}  = this.state.measure;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Maatregel"}
                        size={"col-sm-6"}
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                    <InputText
                        label={"Nummer"}
                        name={"number"}
                        value={number}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="description" className="col-sm-12">Beschrijving</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea name='description' value={description} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: (id) => {
        dispatch(fetchMeasure(id));
    },
});

const mapStateToProps = (state) => {
    return {
        measure: state.measure,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureFormEdit);
