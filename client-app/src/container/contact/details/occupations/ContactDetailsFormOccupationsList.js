import React from 'react';
import {connect} from 'react-redux';

import ContactDetailsFormOccupationsItem from "./ContactDetailsFormOccupationsItem";

const ContactDetailsFormOccupationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-4">Verbonden met</div>
                <div className="col-sm-3">Verbinding</div>
                <div className="col-sm-2">Begin datum</div>
                <div className="col-sm-2">Eind datum</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.occupations.length > 0 ?
                    props.occupations.map((occupation, i) => {
                        return <ContactDetailsFormOccupationsItem
                            key={i}
                            occupation={occupation}
                        />;
                    })
                    :
                    <div>Geen verbindingen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        occupations: state.contactDetails.person.occupations,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOccupationsList);
