import React, {useState, useEffect} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory} from "react-router";
import "./style.css";
import ContactAvailabilityDetailsPlanningPanel from "./ContactAvailabilityDetailsPlanningPanel";
import ContactDetailsAPI from "../../../api/contact/ContactDetailsAPI";
import ContactAvailabilityDetailsGeneral from "./ContactAvailabilityDetailsGeneral";

export default function ContactAvailabilityDetailsApp(props) {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        ContactDetailsAPI.getCoachAttributes(props.params.id).then(data => {
            setContact(data);
        });
    }

    if (!contact) {
        return null;
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'arrowLeft'}
                                                    onClickAction={browserHistory.goBack}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Beschikbaarheid: {contact.fullName}</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <ContactAvailabilityDetailsGeneral contact={contact} onSave={fetch}/>
                </div>

                <div className="col-md-12 margin-10-top">
                    <ContactAvailabilityDetailsPlanningPanel contactId={props.params.id}/>
                </div>
            </div>
            <div className="col-md-3"/>
        </div>
    );
}