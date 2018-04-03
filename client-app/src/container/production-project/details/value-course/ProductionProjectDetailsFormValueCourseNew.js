import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import ProductionProjectValueCourseAPI from '../../../../api/production-project/ProductionProjectValueCourseAPI';
import {newValueCourse} from '../../../../actions/production-project/ProductionProjectDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from "../../../../components/form/InputDate";

class ProductionProjectDetailsFormValueCourseNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productionProjectName: this.props.name,
            valueCourse: {
                productionProjectId: this.props.id,
                date: '',
                bookWorth: '',
                transferWorth: '',
            },
            errors: {
                bookWorth: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { valueCourse } = this.state;
        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(valueCourse.bookWorth)){
            errors.bookWorth = true;
            hasErrors = true;
        }else{
            valueCourse.bookWorth = valueCourse.bookWorth.replace(/,/g, '.');
        };

        if(!validator.isEmpty(valueCourse.transferWorth)){
            valueCourse.transferWorth = valueCourse.transferWorth.replace(/,/g, '.');
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        ProductionProjectValueCourseAPI.storeProductionProjectValueCourse(valueCourse).then((payload) => {
                this.props.newValueCourse(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {date, bookWorth, transferWorth} = this.state.valueCourse;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Project"}
                                name={"productionProjectName"}
                                value={this.state.productionProjectName}
                                readOnly={true}
                            />
                            <InputDate
                                label={"Datum"}
                                name={"date"}
                                value={date}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Boekwaarde"}
                                name={"bookWorth"}
                                value={bookWorth}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.bookWorth}
                            />
                            <InputText
                                label={"Overdrachtswaarde"}
                                name={"transferWorth"}
                                value={transferWorth}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.productionProjectDetails.id,
        name: state.productionProjectDetails.name,
    };
};

const mapDispatchToProps = dispatch => ({
    newValueCourse: (id) => {
        dispatch(newValueCourse(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductionProjectDetailsFormValueCourseNew);