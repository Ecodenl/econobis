import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';

const ProjectFormViewGeneral = ({
    name,
    code,
    description,
    projectStatus,
    projectType,
    postalCode,
    address,
    city,
    dateStartRegistrations,
    dateEndRegistrations,
    ownedBy,
    administration,
    dateStart,
    dateEnd,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    administrations,
    hasPaymentInvoices,
    requiresContactGroups,
}) => (
    <React.Fragment>
        <h4>Algemeen</h4>
        <div className="row">
            <ViewText label={'Project'} value={name} />
            <ViewText label={'Projectcode'} value={code} />
        </div>

        <div className="row">
            <ViewText label={'Type project'} value={projectType ? projectType.name : ''} />
            <ViewText label={'Status'} value={projectStatus ? projectStatus.name : ''} />
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
            <ViewText label={'Postcode'} value={postalCode} />
            <ViewText label={'Adres'} value={address} />
        </div>

        <div className="row">
            <ViewText label={'Plaats'} value={city} />
        </div>

        <div className="row">
            <ViewText
                label={'Start inschrijving'}
                value={dateStartRegistrations ? moment(dateStartRegistrations).format('L') : ''}
            />
            <ViewText label={'Verantwoordelijke'} value={ownedBy ? ownedBy.fullName : ''} />
        </div>

        <div className="row">
            <ViewText
                label={'Eind inschrijving'}
                value={dateEndRegistrations ? moment(dateEndRegistrations).format('L') : ''}
            />

            <ViewText label={'Administratie'} value={administration ? administration.name : ''} />
        </div>

        <div className="row">
            <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
            <ViewText label={'Deelname aan groep verplicht'} value={isMembershipRequired ? 'Ja' : 'Nee'} />
        </div>

        <div className="row">
            <ViewText label={'Einde project'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            {isMembershipRequired ? (
                <ViewText
                    label={'Onderdeel van groep'}
                    value={
                        requiresContactGroups &&
                        requiresContactGroups.map(requiresContactGroup => requiresContactGroup.name).join(', ')
                    }
                />
            ) : null}
        </div>

        <div className="row">
            <ViewText label={'Start productie'} value={dateProduction ? moment(dateProduction).format('L') : ''} />
        </div>
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormViewGeneral);
