import React from 'react';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

export default function DataCleanupItemsToolbar({
    fetchCleanupData,
    handleDataCleanupUpdateItemsAll,
    handleDataCleanupCleanupItemsAll,
    handleForceDeleteContacts,
    softDeletedContactsCount,
    isBusy,
    hasDeterminedItems,
}) {
    const forceDeleteLabel =
        typeof softDeletedContactsCount === 'number'
            ? `Hard verwijderen contacten (${softDeletedContactsCount})`
            : 'Hard verwijderen contacten';

    const forceDeleteDisabled = typeof softDeletedContactsCount === 'number' && softDeletedContactsCount <= 0;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={fetchCleanupData}
                        title={`Herbereken alle op te schonen items`}
                    />
                    <ButtonText
                        buttonText={'Herbereken alles'}
                        onClickAction={handleDataCleanupUpdateItemsAll}
                        title={`Herbereken alle op te schonen items`}
                        loading={isBusy}
                    />
                    <ButtonText
                        buttonText={'Opschonen alles'}
                        buttonClassName={'btn-danger'}
                        onClickAction={handleDataCleanupCleanupItemsAll}
                        title={`Opschonen alle items`}
                        loading={isBusy}
                        disabled={!hasDeterminedItems}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <h3 className="text-center table-title">Opschonen items</h3>
            </div>
            <div className="col-md-4">
                <div className="btn-group pull-right" role="group">
                    <ButtonText
                        buttonText={forceDeleteLabel}
                        buttonClassName={'btn-danger'}
                        onClickAction={handleForceDeleteContacts}
                        title={`Hard verwijderen contacten`}
                        loading={isBusy}
                        disabled={forceDeleteDisabled}
                    />
                </div>
            </div>
        </div>
    );
}
