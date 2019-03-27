import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormOtherView = props => {
    const { firstNamePartner, lastNamePartner, dateOfBirthPartner } = props.contactDetails.person;
    const {
        iban,
        ibanAttn,
        liable,
        liabilityAmount,
        isCollectMandate,
        collectMandateCode,
        collectMandateSignatureDate,
        collectMandateFirstRunDate,
        collectMandateCollectionSchema,
    } = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="IBAN" value={iban} />
                <ViewText label={'Voornaam partner'} value={firstNamePartner} />
            </div>

            <div className="row">
                <ViewText label="IBAN t.n.v." value={ibanAttn} />
                <ViewText label={'Achternaam partner'} value={lastNamePartner} />
            </div>

            <div className="row">
                <ViewText
                    label="Geboortedatum partner"
                    value={dateOfBirthPartner && moment(dateOfBirthPartner).format('DD-MM-Y')}
                    className={'col-sm-push-6 col-sm-6'}
                />
            </div>

            <div className="row">
                <ViewText label={'Aansprakelijkheid'} value={liable ? 'Ja' : 'Nee'} />
                <ViewText
                    label="Aansprakelijkheidsbedrag"
                    value={'€ ' + liabilityAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                />
            </div>

            <div className="row">
                <ViewText label={'Ingesteld op incasso'} value={isCollectMandate ? 'Ja' : 'Nee'} />
                {isCollectMandate ? <ViewText label={'Machtigingskenmerk'} value={collectMandateCode} /> : null}
            </div>

            {isCollectMandate ? (
                <React.Fragment>
                    <div className="row">
                        <ViewText
                            label={'Datum van ondertekening'}
                            value={collectMandateSignatureDate && moment(collectMandateSignatureDate).format('L')}
                        />
                        <ViewText
                            label={'Datum eerste incassoronde'}
                            value={collectMandateFirstRunDate && moment(collectMandateFirstRunDate).format('L')}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Incassoschema'}
                            value={collectMandateCollectionSchema === 'core' ? 'Core' : 'B2B'}
                        />
                    </div>
                </React.Fragment>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOtherView);
