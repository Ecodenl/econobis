import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';
import ButtonText from '../../../../../../components/button/ButtonText';

const PaymentInvoiceCreateToolbar = ({
    amountOfDistributions,
    distributionTypeId,
    createPaymentInvoices,
    distributionCategoryCodeRef,
}) => (
    <div className="row">
        <div className="col-md-4">
            <div className="btn-group btn-group-flex margin-small" role="group">
                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                {amountOfDistributions > 0 && (
                    <ButtonText buttonText={'Rapportage versturen'} onClickAction={() => createPaymentInvoices(1, 0)} />
                )}
                {distributionCategoryCodeRef !== 'revenueKwh' ? (
                    <React.Fragment>
                        {amountOfDistributions > 0 && distributionTypeId !== 3 && (
                            <ButtonText
                                buttonText={'Facturen maken'}
                                onClickAction={() => createPaymentInvoices(0, 1)}
                            />
                        )}
                        {amountOfDistributions > 0 && distributionTypeId !== 3 && (
                            <ButtonText
                                buttonText={'Rapportage versturen en facturen maken'}
                                onClickAction={() => createPaymentInvoices(1, 1)}
                            />
                        )}
                    </React.Fragment>
                ) : null}
            </div>
        </div>
        <div className="col-md-4">
            <h4 className="text-center">Rapportage aanmaken({amountOfDistributions})</h4>
        </div>
        <div className="col-md-4" />
    </div>
);

export default PaymentInvoiceCreateToolbar;
