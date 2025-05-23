import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import ButtonText from '../../../../components/button/ButtonText';
moment.locale('nl');

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const IntakeMeasuresRequestedView = props => {
    const navigate = useNavigate();

    const { id, name } = props.measureRequested;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-6">{name}</div>
                <div className="col-sm-5">
                    {props.permissions.manageOpportunity && props.measureRequestedWithOpportunityIds.includes(id) ? (
                        <ButtonText buttonText={'Kans al gemaakt'} buttonClassName={'btn-success btn-padding-small'} />
                    ) : null}
                    <ButtonText
                        buttonText={'Maak kans'}
                        onClickAction={() => navigate(`/kans/nieuw/intake/${props.intakeId}/maatregel-categorie/${id}`)}
                        buttonClassName={'btn-success btn-padding-small'}
                    />
                </div>
            </div>
            <div className="col-sm-1">
                {props.permissions.manageIntake && props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        energyLabels: state.systemData.energyLabels,
        permissions: state.meDetails.permissions,
        intakeId: state.intakeDetails.id,
        measureRequestedWithOpportunityIds: state.intakeDetails.measureRequestedWithOpportunityIds,
    };
};

export default connect(mapStateToProps, null)(IntakeMeasuresRequestedView);
