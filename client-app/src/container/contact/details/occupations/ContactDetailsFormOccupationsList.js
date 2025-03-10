import React from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormOccupationsItem from './ContactDetailsFormOccupationsItem';

const ContactDetailsFormOccupationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Verbonden met</div>
                <div className="col-sm-2">Verbinding</div>
                <div className="col-sm-2">Begindatum</div>
                <div className="col-sm-2">Einddatum</div>
                <div className="col-sm-1">
                    <span className="pull-right">Primair</span>
                </div>
                <div className="col-sm-1">
                    <span className="pull-right">Beheer in Portaal</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.primaryOccupations.length > 0 &&
                props.primaryOccupations.map(primaryOccupation => {
                    return (
                        <ContactDetailsFormOccupationsItem
                            key={primaryOccupation.id}
                            occupation={primaryOccupation}
                            primaryOccupation={true}
                            contacts={props.contacts}
                            peekLoading={props.peekLoading}
                        />
                    );
                })}
            {props.occupations.length > 0 &&
                props.occupations.map(occupation => {
                    return (
                        <ContactDetailsFormOccupationsItem
                            key={occupation.id}
                            occupation={occupation}
                            primaryOccupation={false}
                            contacts={props.contacts}
                            peekLoading={props.peekLoading}
                        />
                    );
                })}
            {props.primaryOccupations.length === 0 && props.occupations.length === 0 && (
                <div>Geen verbindingen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        primaryOccupations: state.contactDetails.primaryOccupations,
        occupations: state.contactDetails.occupations,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOccupationsList);
