import React from 'react';
import { connect } from 'react-redux';

import HousingFileHousingStatusItem from './HousingFileHousingStatusItem';

const HousingFileHousingStatusList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-4">Kenmerk</div>
                <div className="col-sm-7">Status</div>
                <div className="col-sm-1" />
            </div>
            {props.housingFileHousingStatuses.length > 0 ? (
                props.housingFileHousingStatuses.map((housingFileHousingStatus, i) => {
                    if (
                        housingFileHousingStatus.housingFileHoomLink &&
                        housingFileHousingStatus.housingFileHoomLink.visibleInEconobis
                    ) {
                        return (
                            <HousingFileHousingStatusItem key={i} housingFileHousingStatus={housingFileHousingStatus} />
                        );
                    }
                })
            ) : (
                <div>Geen woningstatussen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFileHousingStatuses: state.housingFileDetails.housingFileHousingStatuses,
    };
};

export default connect(mapStateToProps)(HousingFileHousingStatusList);
