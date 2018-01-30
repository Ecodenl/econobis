import React from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import ContactGroupList from './ContactGroupList';

const ContactGroupHarmonica = ({toggleShowList, showContactGroupsList, toggleAddGroup, groupCount}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-12">
                    <span onClick={toggleShowList} className="">GROEPEN <span className="badge">{ groupCount }</span></span>
                    <a role="button" className="pull-right" onClick={toggleAddGroup}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    { showContactGroupsList && <ContactGroupList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ContactGroupHarmonica;