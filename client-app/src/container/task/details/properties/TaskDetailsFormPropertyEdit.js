import React, {Component} from 'react';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import {connect} from "react-redux";

class TaskDetailsFormPropertyEdit extends Component {
    constructor(props) {
        super(props);

        const {id, value} = props.property;

        this.state = {
            property: {
                propertyId: id,
                value: value,
            },

            errors: {
               property: false,
               value: false,
            },
        };
    };


    handleInputPropertyChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const propertyName = target[target.selectedIndex].innerHTML;
        this.setState({
            ...this.state,
            property: {
                ...this.state.property,
                [name]: value
            },
        });

        this.props.setPropertyIdAndName(value, propertyName);
    };

    handleSubmit = event => {
        event.preventDefault();
        const { property } = this.props;
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
            this.props.handleSubmit();
        }
    };

    render() {
        const {propertyId, value} = this.props.property;
        return (
            <div>
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
                                    onChangeAction={this.handleInputPropertyChange}
                                    required={"required"}
                                    error={this.state.errors.propertyId}
                                />
                                <InputText
                                    label={"Waarde"}
                                    name={"value"}
                                    value={value}
                                    onChangeAction={this.props.handleInputChange}
                                    error={this.state.errors.value}
                                />
                            </div>

                            <div className="pull-right btn-group" role="group">
                                <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                            onClickAction={this.props.cancelEdit}/>
                                <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}
                                            type={"submit"} value={"Submit"}/>
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        properties: state.systemData.taskProperties
    };
};

export default connect(mapStateToProps)(TaskDetailsFormPropertyEdit);
