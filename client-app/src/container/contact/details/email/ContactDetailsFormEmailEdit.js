import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from '../../../../components/form/InputToggle';

const ContactDetailsFormEmailEdit = props => {
    const { email, typeId, primary } = props.emailAddress;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'E-mail'}
                            id={'email'}
                            size={'col-sm-6'}
                            name={'email'}
                            value={email}
                            onChangeAction={props.handleInputChange}
                            required={'required'}
                            error={props.emailError}
                        />

                        <InputSelect
                            label={'Type'}
                            id="type"
                            size={'col-sm-6'}
                            name={'typeId'}
                            options={props.emailAddressTypes}
                            value={typeId}
                            onChangeAction={props.handleInputChange}
                            required={'required'}
                            error={props.typeIdError}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Primair e-mailadres'}
                            name={'primary'}
                            value={primary}
                            onChangeAction={props.handleInputChange}
                            disabled={primary}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={props.cancelEdit}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={props.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactDetailsFormEmailEdit);
