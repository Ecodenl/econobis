import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactGroupDetailsFormGeneralView = props => {
    const {
        name,
        dynamicFilterType,
        contactGroupComposedType,
        description,
        responsibleUser = {},
        closedStatus,
        dateStarted,
        dateFinished,
        createdAt,
        type,
        createdBy,
        showPortal,
        editPortal,
        showContactForm,
    } = props.contactGroupDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label={'Naam'} value={name} />
                {type.id === 'composed' && (
                    <ViewText
                        label={'Voorwaarde'}
                        value={contactGroupComposedType === 'one' ? 'In één van de groepen' : 'In alle groepen'}
                    />
                )}
                {type.id === 'dynamic' && (
                    <ViewText
                        label={'Filter voorwaarde'}
                        value={
                            dynamicFilterType === 'or' ? 'Alle extra filters zijn "OF"' : 'Alle extra filters zijn "EN"'
                        }
                    />
                )}
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">
                        Omschrijving
                    </label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={'Verantwoordelijke'}
                    value={responsibleUser && responsibleUser.fullName}
                    link={responsibleUser ? 'gebruiker/' + responsibleUser.id : ''}
                />
                <ViewText label="Status" value={closedStatus} />
            </div>

            <div className="row">
                <ViewText label={'Startdatum'} value={dateStarted && moment(dateStarted.date).format('DD-MM-Y')} />
                <ViewText label="Datum gereed" value={dateFinished && moment(dateFinished.date).format('DD-MM-Y')} />
            </div>

            <div className="row">
                <ViewText label={'Zichtbaar op portaal'} value={showPortal ? 'Ja' : 'Nee'} />
                <ViewText label={'Veranderen op portaal'} value={editPortal ? 'Ja' : 'Nee'} />
            </div>

            <div className="row">
                <ViewText label={'Zichtbaar bij contact'} value={showContactForm ? 'Ja' : 'Nee'} />
                <ViewText label={'Type'} value={type ? type.name : ''} />
            </div>

            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt && moment(createdAt).format('DD-MM-Y')} />
                <ViewText label="Gemaakt door" value={createdBy && createdBy.fullName} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactGroupDetails: state.contactGroupDetails,
    };
};

export default connect(mapStateToProps)(ContactGroupDetailsFormGeneralView);
