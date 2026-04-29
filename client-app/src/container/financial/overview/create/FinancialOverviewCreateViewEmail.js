import React, { useEffect, useState } from 'react';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

const FinancialOverviewCreateViewEmail = ({
    financialOverviewContactId,
    isLoading = false,
    amountOfFinancialOverviewContacts = 0,
}) => {
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if (!financialOverviewContactId) {
            setEmail(null);
            return;
        }

        FinancialOverviewContactAPI.getEmailPreview(financialOverviewContactId)
            .then(payload => {
                setEmail(payload.data);
            })
            .catch(() => {
                setEmail(null);
            });
    }, [financialOverviewContactId]);

    if (isLoading) {
        return <div>Gegevens aan het laden.</div>;
    }

    if (!email) {
        if (amountOfFinancialOverviewContacts > 0) {
            return <div>Selecteer links in het scherm een contact om een preview te zien.</div>;
        }
        return <div>Geen gegevens gevonden.</div>;
    }

    return (
        <div>
            <div className="row margin-10-top">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Aan</label>
                        </div>
                        <div className="col-sm-9">{email.to}</div>
                    </div>
                </div>
            </div>

            {email.bcc ? (
                <div className="row margin-10-top">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Bcc</label>
                            </div>
                            <div className="col-sm-9">{email.bcc}</div>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="row margin-10-top">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-9">{email.subject}</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <ViewHtmlAsText label={'Tekst'} value={email.htmlBody} />
            </div>
        </div>
    );
};

export default FinancialOverviewCreateViewEmail;
