import React from 'react';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

export default function DataCleanupItemsToolbar({ fetchCleanupData, handleDataCleanupUpdateItems }) {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={() => fetchCleanupData}
                        title={`Herbereken alle op te schonen items`}
                    />
                    <ButtonText
                        buttonText={'Herbereken'}
                        onClickAction={() => handleDataCleanupUpdateItems('all')}
                        title={`Herbereken alle op te schonen items`}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Opschonen items</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
}
