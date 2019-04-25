import React from 'react';

import InputText from '../../../../../../components/form/InputText';
import ButtonText from '../../../../../../components/button/ButtonText';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import moment from 'moment/moment';
moment.locale('nl');

const ObligationNumberFormEdit = props => {
    const { number } = props.obligationNumber;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Nummer'}
                                id={'number'}
                                name={'number'}
                                value={number}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.errors.number}
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
        </div>
    );
};

export default ObligationNumberFormEdit;
