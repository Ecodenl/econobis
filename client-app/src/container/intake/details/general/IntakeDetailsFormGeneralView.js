import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const IntakeDetailsFormGeneralView = props => {
    const navigate = useNavigate();

    const { address, contact, status, sources, campaign, reasons, note } = props.intakeDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label={'Contact'} value={contact.fullName} link={contact ? '/contact/' + contact.id : ''} />
                <div className={'col-sm-6'}>
                    <label htmlFor={'address'} className="col-sm-6">
                        {'Adres'}
                    </label>
                    <div className="col-sm-6" id={'address'}>
                        {address && address.housingFile ? (
                            <Link
                                onClick={() => navigate(`/woningdossier/${address.housingFile.id}`)}
                                className='"link-underline"'
                            >
                                {' '}
                                {address &&
                                    address.street +
                                        ' ' +
                                        address.number +
                                        (address.addition ? '-' + address.addition : '')}
                            </Link>
                        ) : (
                            <div>
                                {address &&
                                    address.street +
                                        ' ' +
                                        address.number +
                                        (address.addition ? '-' + address.addition : '')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
                <ViewText label="Campagne" value={campaign && campaign.name} />
                <ViewText label="Woonplaats" value={address && address.city} />
            </div>

            <div className="row">
                <ViewText label={'Aanmeldingsbron'} value={sources && sources.map(source => source.nameCustom ?? source.name).join(', ')} />
                <ViewText label="Status" value={status && status.name} />
            </div>

            <div className="row">
                <ViewText
                    label={'Wat is belangrijk'}
                    value={reasons && reasons.map(reason => reason.name).join(', ')}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="note" className="col-sm-12">
                        Opmerkingen van bewoner
                    </label>
                </div>
                <div className="col-sm-9" id="note">
                    {note}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        intakeDetails: state.intakeDetails,
    };
};

export default connect(mapStateToProps)(IntakeDetailsFormGeneralView);
