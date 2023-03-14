import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');

const HousingFileSpecificationView = props => {
    const { id, measure, status, measureDate, answer, floor, side, typeBrand } = props.housingFileSpecification;
    const { showEdit } = props;

    return (
        <>
            <div
                className={`row border ${props.highlightLine}`}
                onMouseEnter={() => props.onLineEnter()}
                onMouseLeave={() => props.onLineLeave()}
            >
                <div onClick={props.openEdit}>
                    <div className="col-sm-3">{measure.name}</div>
                    <div className="col-sm-3">{measure.measureCategory && measure.measureCategory.name}</div>
                    <div className="col-sm-3">{status ? status.name : ''}</div>
                    <div className="col-sm-2">{measureDate && moment(measureDate).format('L')}</div>
                </div>
                <div className="col-sm-1">
                    {props.showActionButtons && props.permissions.manageHousingFile ? (
                        <a role="button" onClick={props.openEdit}>
                            <Icon class="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {props.showActionButtons && props.permissions.manageHousingFile ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon class="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            {!showEdit && answer ? (
                <div
                    onClick={props.openEdit}
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                >
                    <div>
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Waarde:</div>
                        <div className="col-sm-8">{answer}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {!showEdit && floor ? (
                <div
                    onClick={props.openEdit}
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                >
                    <div>
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Verdieping:</div>
                        <div className="col-sm-8">{floor ? floor.name : ''}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {!showEdit && side ? (
                <div
                    onClick={props.openEdit}
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                >
                    <div>
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Zijde:</div>
                        <div className="col-sm-8">{side ? side.name : ''}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {!showEdit && typeBrand ? (
                <div
                    onClick={props.openEdit}
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                >
                    <div>
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Type/merk:</div>
                        <div className="col-sm-8">{typeBrand}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileSpecificationView);
