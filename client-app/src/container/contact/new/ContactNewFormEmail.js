import React, {Component} from 'react';
import {connect} from 'react-redux';

import InputText from '../../../components/form/InputText';
import InputSelect from "../../../components/form/InputSelect";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputToggle from "../../../components/form/InputToggle";

class ContactNewFormEmail extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {email, typeId, primary} = this.props.emailAddress;

        return (
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={"E-mail"}
                            id={"email"}
                            size={"col-sm-6"}
                            name={"email"}
                            value={email}
                            onChangeAction={this.props.handleInputChange}
                            required={"required"}
                            error={this.props.errors.email}
                        />

                        <InputSelect
                            label={"Type"}
                            id="type"
                            size={"col-sm-6"}
                            name={"typeId"}
                            options={this.props.emailAddressTypes}
                            value={typeId}
                            onChangeAction={this.props.handleInputChange}
                            required={"required"}
                            error={this.props.errors.typeId}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={"Primair e-mailadres"}
                            name={"primary"}
                            value={primary}
                            onChangeAction={this.props.handleInputChange}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes,
    };
};

export default connect(mapStateToProps)(ContactNewFormEmail);