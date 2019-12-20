import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormOrganisationView = props => {
    const {
        number,
        organisation,
        iban,
        ibanAttn,
        createdAt,
        didAgreeAvg,
        dateDidAgreeAvg,
        isCollectMandate,
        collectMandateCode,
        collectMandateSignatureDate,
        collectMandateFirstRunDate,
        collectMandateCollectionSchema,
    } = props.contactDetails;

    return (
        <div>
            <div className="row">
                <ViewText className={'col-xs-12'} label={'Contactnummer'} value={number} />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={'Gemaakt op'}
                    value={createdAt && moment(createdAt.date).format('DD-MM-Y')}
                />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="Naam" value={organisation.name} />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="KvK" value={organisation.chamberOfCommerceNumber} />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="Btw nummer" value={organisation.vatNumber} />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="IBAN" value={iban} />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="IBAN t.n.v." value={ibanAttn} />
            </div>

            <div className="row">
                <ViewText className={'col-xs-12'} label="Website" value={organisation.website} />
            </div>

            <div className="row">
                <ViewText
                    label={'Akkoord privacybeleid'}
                    className={'col-xs-12'}
                    value={
                        didAgreeAvg ? (
                            <span>
                                Ja <em>({dateDidAgreeAvg ? moment(dateDidAgreeAvg).format('L') : ''})</em>
                            </span>
                        ) : (
                            'Nee'
                        )
                    }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={'Ingesteld op incasso'}
                    value={isCollectMandate ? 'Ja' : 'Nee'}
                />
            </div>

            {isCollectMandate ? (
                <React.Fragment>
                    <div className="row">
                        <ViewText className={'col-xs-12'} label={'Machtigingskenmerk'} value={collectMandateCode} />
                    </div>

                    <div className="row">
                        <ViewText
                            className={'col-xs-12'}
                            label={'Datum van ondertekening'}
                            value={collectMandateSignatureDate && moment(collectMandateSignatureDate).format('L')}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            className={'col-xs-12'}
                            label={'Datum eerste incassoronde'}
                            value={collectMandateFirstRunDate && moment(collectMandateFirstRunDate).format('L')}
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

export default connect(mapStateToProps)(ContactDetailsFormOrganisationView);
