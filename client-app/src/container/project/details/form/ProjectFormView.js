import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const ProjectFormView = props => {
    const {
        name,
        code,
        description,
        ownedBy,
        projectStatus,
        dateStart,
        date,
        dateStartRegistrations,
        dateEndRegistrations,
        projectType,
        postalCode,
        address,
        city,
        ean,
        eanManager,
        warrantyOrigin,
        eanSupply,
        participationWorth,
        powerKwAvailable,
        maxParticipations,
        taxReferral,
        maxParticipationsYouth,
        totalParticipations,
        minParticipations,
        issuedParticipations,
        isMembershipRequired,
        participationsInOption,
        isParticipationTransferable,
        issuableParticipations,
        administration,
        postalcodeLink,
        requiresContactGroups,
    } = props.project;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Naam'} value={name} />
                <ViewText label={'Projectcode'} value={code} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">
                        Omschrijving
                    </label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Verantwoordelijke'} value={ownedBy ? ownedBy.fullName : ''} />
                <ViewText label={'Status'} value={projectStatus ? projectStatus.name : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
                <ViewText label={'Datum productie'} value={date ? moment(date).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Start inschrijving'}
                    value={dateStartRegistrations ? moment(dateStartRegistrations).format('L') : ''}
                />
                <ViewText
                    label={'Eind inschrijving'}
                    value={dateEndRegistrations ? moment(dateEndRegistrations).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Type'} value={projectType ? projectType.name : ''} />
                <ViewText label={'Administratie'} value={administration ? administration.name : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Postcode'} value={postalCode ? postalCode : ''} />
                <ViewText label={'Adres'} value={address ? address : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Plaats'} value={city ? city : ''} />
                <ViewText label={'Postcoderoos'} value={postalcodeLink ? postalcodeLink : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'EAN'} value={ean ? ean : ''} />
                <ViewText label={'EAN Netbeheer'} value={eanManager ? eanManager : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Garantie van oorsprong'} value={warrantyOrigin ? warrantyOrigin : ''} />
                <ViewText label={'EAN Levering'} value={eanSupply ? eanSupply : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Waarde per participatie'}
                    value={participationWorth ? '€ ' + participationWorth : ''}
                />
                <ViewText label={'Opgesteld vermogen kW'} value={powerKwAvailable ? powerKwAvailable : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Max aantal part. p/p'} value={maxParticipations ? maxParticipations : ''} />
                <ViewText label={'Aanwijzing belastingdienst'} value={taxReferral ? taxReferral : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Max aantal part. jeugd'}
                    value={maxParticipationsYouth ? maxParticipationsYouth : ''}
                />
                <ViewText label={'Totaal aantal participaties'} value={totalParticipations && totalParticipations} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Min. aantal part. p/p'} value={minParticipations ? minParticipations : ''} />
                <ViewText label={'Uitgegeven participaties'} value={issuedParticipations && issuedParticipations} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Participaties overdraagbaar'} value={isParticipationTransferable ? 'Ja' : 'Nee'} />
                <ViewText label={'Participaties in optie'} value={participationsInOption && participationsInOption} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Deelname aan groep verplicht'} value={isMembershipRequired ? 'Ja' : 'Nee'} />
                <ViewText
                    label={'Uit te geven participaties'}
                    value={issuableParticipations && issuableParticipations}
                />
            </div>
            {isMembershipRequired == true && (
                <div className="row" onClick={props.switchToEdit}>
                    <ViewText
                        label={'Onderdeel van groep'}
                        value={
                            requiresContactGroups &&
                            requiresContactGroups.map(requiresContactGroup => requiresContactGroup.name).join(', ')
                        }
                    />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectFormView);
