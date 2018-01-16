import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

import ViewText from '../../../../components/form/ViewText';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

const OpportunityFormView = props => {
    const {campaign, contact, desiredDate, measure, number, quotationText, reaction, status, ownedBy, registration} = props.opportunity;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Kans"}
                    value={measure.name}
                />
                <ViewText
                    label={"Kans nummer"}
                    value={number}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Contact"}
                    value={contact.fullName}
                    link={'contact/' + contact.id}
                />
                <ViewText
                    label={"Reactie"}
                    value={reaction ? reaction.name : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Aanmelding"}
                    value={registration ? "Aanmelding: " + registration.id : ''}
                    link={registration ? 'aanmelding/' + registration.id : ''}
                />
                <ViewText
                    label={"Status"}
                    value={status.name}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className='col-sm-12'>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Campagne</label>
                        </div>
                        <div className="col-sm-8">
                            <Link to={campaign ? 'campagne/' + campaign.id : ''}
                                  className="link-underline">{campaign ? campaign.name : ''}</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewHtmlAsText
                    label={"Offerte tekst"}
                    value={quotationText}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Gewenste realisatie"}
                    value={desiredDate ? moment(desiredDate).format('L') : ''}
                />
                <ViewText
                    label={"Verantwoordelijke"}
                    value={ownedBy ? ownedBy.fullName : ''}
                    link={ownedBy ? 'gebruiker/' + ownedBy.id : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunity,
    }
};

export default connect(mapStateToProps)(OpportunityFormView);