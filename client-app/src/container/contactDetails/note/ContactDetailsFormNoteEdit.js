import React from 'react';
import { connect } from 'react-redux';

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const  ContactDetailsFormNoteEdit = props => {
    const { note } = props.note;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <textarea name={note} value={note} onChange={props.handleInputChange} className="col-sm-12" />
                    </div>

                    <div className="pull-right btn-group extra-space-above" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={props.closeEdit}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormNoteEdit);