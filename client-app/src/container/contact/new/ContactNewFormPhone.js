import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputToggle from '../../../components/form/InputToggle';

class ContactNewFormPhone extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { number, typeId, primary } = this.props.phoneNumber;

        return (
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Nummer'}
                            size={'col-sm-6'}
                            name={'number'}
                            value={number}
                            onChangeAction={this.props.handleInputChange}
                            required={'required'}
                            error={this.props.errors.number}
                        />

                        <InputSelect
                            label={'Type'}
                            size={'col-sm-6'}
                            name={'typeId'}
                            options={this.props.phoneNumberTypes}
                            value={typeId}
                            onChangeAction={this.props.handleInputChange}
                            required={'required'}
                            error={this.props.errors.typeId}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Primair telefoonnummer'}
                            name={'primary'}
                            value={primary}
                            onChangeAction={this.props.handleInputChange}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        phoneNumberTypes: state.systemData.phoneNumberTypes,
    };
};

export default connect(mapStateToProps)(ContactNewFormPhone);
