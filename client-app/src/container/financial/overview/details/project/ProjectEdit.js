import React from 'react';

import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputToggle from '../../../../../components/form/InputToggle';
import ViewText from '../../../../../components/form/ViewText';

const ProjectEdit = props => {
    const { code, name, definitive } = props.project;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Projectcode'} id={'code'} size={'col-sm-6'} value={code} />
                        <ViewText label={'Project'} id={'name'} size={'col-sm-6'} value={name} />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Definitief'}
                            name={'definitive'}
                            value={definitive}
                            onChangeAction={props.handleInputChange}
                            disabled={definitive}
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

export default ProjectEdit;
