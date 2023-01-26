import React, {useState} from 'react';
import ContactAvailabilityDetailsGeneralEdit from "./ContactAvailabilityDetailsGeneralEdit";
import ContactAvailabilityDetailsGeneralView from "./ContactAvailabilityDetailsGeneralView";

export default function ContactAvailabilityDetailsGeneral({contact, onSave}) {
    const [divClass, setDivClass] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className={divClass} onMouseEnter={() => setDivClass('panel-grey')} onMouseLeave={() => setDivClass('')}>
            {showEdit ? (
                <ContactAvailabilityDetailsGeneralEdit contact={contact} switchToView={() => setShowEdit(false)} onSave={onSave}/>
            ) : (
                <ContactAvailabilityDetailsGeneralView contact={contact} switchToEdit={() => setShowEdit(true)}/>
            )}
        </div>
    );
}
