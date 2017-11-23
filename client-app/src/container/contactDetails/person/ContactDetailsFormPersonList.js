import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormPersonItem from "./ContactDetailsFormPersonItem";

const ContactDetailsFormPersonList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-8">Persoon</div>
                <div className="col-sm-1">Primair</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.people.length > 0 ?
                    props.people.map(person => {
                        return <ContactDetailFormPersonItem
                            key={person.id}
                            person={person}
                        />;
                    })
                    :
                    <div>Geen contacten bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        people: state.contactDetails.account.people,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPersonList);
