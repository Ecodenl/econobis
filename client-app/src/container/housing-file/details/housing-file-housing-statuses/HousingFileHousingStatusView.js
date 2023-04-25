import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');

const HousingFileHousingStatusView = props => {
    const { id, housingFileHoomLink, status } = props.housingFileHousingStatus;
    const hasHoomDossierLink = props.housingFileDetails.hoomBuildingId != null ? true : false;

    return (
        <>
            <div
                className={`row border ${props.highlightLine}`}
                onMouseEnter={() => props.onLineEnter()}
                onMouseLeave={() => props.onLineLeave()}
            >
                <div>
                    <div className="col-sm-4">{housingFileHoomLink.label}</div>
                    <div className="col-sm-7">{status.hoomStatusName}</div>
                </div>
                <div className="col-sm-1">
                    {!hasHoomDossierLink && props.showActionButtons && props.permissions.manageHousingFile ? (
                        <a role="button" onClick={props.openEdit}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {!hasHoomDossierLink && props.showActionButtons && props.permissions.manageHousingFile ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileHousingStatusView);
