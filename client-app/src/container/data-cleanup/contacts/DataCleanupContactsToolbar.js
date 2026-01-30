import React from 'react';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

export default function DataCleanupContactsToolbar({ fetchCleanupData }) {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon
                        iconName={'refresh'}
                        onClickAction={fetchCleanupData}
                        title={`Haal gegevens opnieuw op`}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Opschonen contacten</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
}
