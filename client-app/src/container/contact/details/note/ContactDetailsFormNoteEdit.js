import React from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const  ContactDetailsFormNoteEdit = props => {
    const { note } = props.note;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea name={note} value={note} onChange={props.handleInputChange} className="form-control input-sm" />
                        </div>
                    </div>

                    <div className="pull-right btn-group margin-10-top" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

export default ContactDetailsFormNoteEdit;