import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormPersonItem from "./ContactDetailsFormPersonItem";

const ContactDetailsFormPersonList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-4">Type</div>
                <div className="col-sm-3">Persoon</div>
                <div className="col-sm-2">Begin datum</div>
                <div className="col-sm-2">Eind datum</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.people.length > 0 ?
                    props.people.map((person, i) => {
                        return <ContactDetailFormPersonItem
                            key={i}
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
        people: state.contactDetails.organisation.people,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPersonList);
