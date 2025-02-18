import React from 'react';
import moment from 'moment';
import ViewText from '../../../../components/form/ViewText';
import ViewText_3_9 from '../../../../components/form/ViewText_3_9';

moment.locale('nl');

const CampaignFormView = ({
    campaign: {
        name,
        number,
        description,
        startDate,
        endDate,
        status,
        measureCategories,
        opportunityActions,
        type,
        wozLimit,
        subsidyPossible,
    },
    switchToEdit,
}) => {
    return (
        <div>
            <div className="row" onClick={switchToEdit}>
                <ViewText label={'Naam'} value={name} />
                <ViewText label={'Campagne nummer'} value={number} />
            </div>

            <div className="row" onClick={switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">
                        Beschrijving
                    </label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText label={'Begindatum'} value={startDate ? moment(startDate).format('L') : ''} />
                <ViewText label={'Einddatum'} value={endDate ? moment(endDate).format('L') : ''} />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText label={'Status'} value={status?.name || ''} />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText_3_9
                    label={'Aangeboden maatregelen'}
                    value={
                        measureCategories && measureCategories.map(measureCategory => measureCategory.name).join(', ')
                    }
                />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText_3_9
                    label={'Aangeboden kansacties'}
                    value={
                        opportunityActions &&
                        opportunityActions.map(opportunityAction => opportunityAction.name).join(', ')
                    }
                />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText label={'Type'} value={type?.name || ''} />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText_3_9 label={'Subsidie mogelijk'} value={subsidyPossible ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={switchToEdit}>
                <ViewText_3_9 label={'Woz grens'} value={wozLimit} />
            </div>
        </div>
    );
};

export default CampaignFormView;
