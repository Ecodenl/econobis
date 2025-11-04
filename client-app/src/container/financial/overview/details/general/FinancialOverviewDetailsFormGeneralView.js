import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

const FinancialOverviewDetailsFormGeneralView = ({
    description,
    year,
    administrationId,
    statusId,
    dateProcessed,
    hasInterimFinancialOverviewContacts,
    documentTemplateFinancialOverview,
    switchToEdit,
    callFetchFinancialOverviewDetails,
    administrations,
}) => {
    let status = '';
    switch (statusId) {
        case 'in-progress':
            status = 'Wordt aangemaakt...';
            break;
        case 'concept':
            if (hasInterimFinancialOverviewContacts) {
                status = 'Concept / Verwerkt';
            } else {
                status = 'Concept';
            }
            break;
        case 'definitive':
            status = 'Definitief';
            break;
        case 'processed':
            status = 'Verwerkt';
            break;
    }
    const dateProcessedFormated = dateProcessed ? moment(dateProcessed).format('DD-MM-Y') : '';
    let messageText = null;
    if (statusId === 'in-progress') {
        messageText = `Waardestaat ${description} wordt op dit moment gemaakt. Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om status overzicht te verversen. `;
    }

    return (
        <>
            <div onClick={switchToEdit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <ViewText label={'Jaar'} value={year} />
                            <ViewText label={'Status'} value={status} />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Administratie'}
                                value={
                                    administrationId
                                        ? administrations.find(administration => administration.id == administrationId)
                                              .name
                                        : ''
                                }
                            />
                            <ViewText label={'Datum verwerkt'} value={dateProcessedFormated} />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Document template'}
                                value={documentTemplateFinancialOverview ? documentTemplateFinancialOverview.name : ''}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </div>
            {statusId === 'in-progress' ? (
                <div>
                    <Panel>
                        <PanelBody>
                            <div className="col-md-12 margin-10-top">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="btn-group btn-group-flex" role="group">
                                            <ButtonIcon
                                                iconName={'refresh'}
                                                onClickAction={callFetchFinancialOverviewDetails}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        {messageText ? <div className="alert alert-danger">{messageText}</div> : null}
                                    </div>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            ) : null}
            {statusId === 'concept' && hasInterimFinancialOverviewContacts ? (
                <div>
                    <Panel>
                        <PanelBody>
                            <div className="col-md-12 margin-10-top">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Er zijn reeds verwerkte tussentijdse waardestaten gemaakt!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            ) : null}
        </>
    );
};

export default FinancialOverviewDetailsFormGeneralView;
