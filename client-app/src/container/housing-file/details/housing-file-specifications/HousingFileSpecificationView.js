import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

moment.locale('nl');

const HousingFileSpecificationView = props => {
    const { id, measure, status, measureDate, answer, floor, side, typeBrand } = props.housingFileSpecification;

    return (
        <>
            <div
                className={`row border ${props.highlightLine}`}
                onMouseEnter={() => props.onLineEnter()}
                onMouseLeave={() => props.onLineLeave()}
            >
                <div>
                    <div className="col-sm-3">{measure.name}</div>
                    <div className="col-sm-3">{measure.measureCategory && measure.measureCategory.name}</div>
                    <div className="col-sm-3">{status ? status.name : ''}</div>
                    <div className="col-sm-2">{measureDate && moment(measureDate).format('L')}</div>
                    {/*<div className="col-sm-2">{answer ? answer : ''}</div>*/}
                    {/*<div className="col-sm-1">{floor ? floor.name : ''}</div>*/}
                    {/*<div className="col-sm-1">{side ? side.name : ''}</div>*/}
                    {/*<div className="col-sm-1">{typeBrand ? typeBrand : ''}</div>*/}
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
            {answer ? (
                <div
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
            {floor ? (
                <div
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
            {side ? (
                <div
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
            {typeBrand ? (
                <div
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
