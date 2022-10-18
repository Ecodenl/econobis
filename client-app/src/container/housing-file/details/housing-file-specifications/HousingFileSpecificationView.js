import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

moment.locale('nl');

const HousingFileSpecificationView = props => {
    const { id, measure, status, measureDate, answer, floor, side, typeBrand } = props.housingFileSpecification;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-2">{measure.name}</div>
                <div className="col-sm-1">{status ? status.name : ''}</div>
                <div className="col-sm-1">{measureDate && moment(measureDate).format('L')}</div>
                <div className="col-sm-2">{answer ? answer : ''}</div>
                <div className="col-sm-1">{floor ? floor.name : ''}</div>
                <div className="col-sm-1">{side ? side.name : ''}</div>
                <div className="col-sm-1">{typeBrand ? typeBrand : ''}</div>
                <div className="col-sm-2">{measure.measureCategory && measure.measureCategory.name}</div>
            </div>
            <div className="col-sm-1">
                {props.permissions.manageHousingFile && props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileSpecificationView);
