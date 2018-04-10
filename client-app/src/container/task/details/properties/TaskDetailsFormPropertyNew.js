import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskDetailsAPI from '../../../../api/task/TaskDetailsAPI';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchTaskDetails } from '../../../../actions/task/TaskDetailsActions';

class TaskDetailsFormPropertyNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            property: {
                propertyId: '',
                value: '',
            },
            errors: {
                propertyId: false,
                value: false,
            },
        };
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            property: {
                ...this.state.property,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { property } = this.state;
        let hasError = false;
        if(property.value == '' && property.propertyId == ''){
            hasError = true;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    value: true,
                    propertyId: true,
                },
            });
        }else if(property.value == '' && property.propertyId != ''){
            hasError = true;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    value: true,
                    propertyId: false,
                },
            });
        }
        else if(property.value != '' && property.propertyId == ''){
            hasError = true;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    value: false,
                    propertyId: true,
                },
            });
        }
        else if(property.value != '' && property.propertyId != ''){
            hasError = false;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    value: false,
                    propertyId: false,
                },
            });
        }

        if(!hasError){
            TaskDetailsAPI.storeTaskProperty(this.props.taskId, property).then(() => {
                this.props.fetchTaskDetails(this.props.taskId);
                this.props.toggleShowNew();
            });
        }
    };

    render() {
        const {propertyId, value} = this.state.property;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Kenmerk"}
                                size={"col-sm-6"}
                                name={"propertyId"}
                                options={this.props.properties}
                                value={propertyId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.propertyId}
                            />
                            <InputText
                                label={"Waarde"}
                                name={"value"}
                                value={value}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.value}
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
        taskId: state.taskDetails.id,
        properties: state.systemData.taskProperties
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTaskDetails: (id) => {
        dispatch(fetchTaskDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsFormPropertyNew);
