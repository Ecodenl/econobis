import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');

const HousingFileSpecificationView = props => {
    const {
        id,
        measure,
        isDefaultEconobisMeasure,
        status,
        measureDate,
        answer,
        floor,
        side,
        typeBrand,
        externalHoomName,
        typeOfExecution,
        savingsGas,
        savingsElectricity,
        co2Savings,
    } = props.housingFileSpecification;

    return (
        <>
            <div
                className={`row border ${props.highlightLine}`}
                onMouseEnter={() => props.onLineEnter()}
                onMouseLeave={() => props.onLineLeave()}
                onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
            >
                {props.showCheckboxList ? (
                    <div className="col-sm-1">
                        {status && status.codeRef === 'desirable' ? (
                            <input
                                type="checkbox"
                                name={id}
                                onChange={props.toggleSpecificationCheck}
                                checked={props.specificationIds ? props.specificationIds.includes(id) : false}
                            />
                        ) : (
                            ' '
                        )}
                    </div>
                ) : null}
                <div className="col-sm-3">{isDefaultEconobisMeasure ? externalHoomName : measure.name}</div>
                <div className="col-sm-3">{measure.measureCategory && measure.measureCategory.name}</div>
                <div className={props.showCheckboxList ? 'col-sm-2' : 'col-sm-3'}>{status ? status.name : ''}</div>
                <div className="col-sm-2">{measureDate && moment(measureDate).format('L')}</div>
                <div className="col-sm-1">
                    {!props.showCheckboxList &&
                    props.showActionButtons &&
                    props.permissions.manageHousingFile &&
                    !props.hasHoomDossierLink ? (
                        <>
                            <a role="button" onClick={props.openEdit}>
                                <Icon className="mybtn-success" size={14} icon={pencil} />
                            </a>
                            <a role="button" onClick={props.toggleDelete}>
                                <Icon className="mybtn-danger" size={14} icon={trash} />
                            </a>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            {(!props.showEdit || props.showCheckboxList) && answer ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Waarde:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{answer}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && floor ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Verdieping:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>
                            {floor ? floor.name : ''}
                        </div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && side ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Zijde:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{side ? side.name : ''}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && typeBrand ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Type/merk:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{typeBrand}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && typeOfExecution ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Uitvoering:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>
                            {typeOfExecution === null
                                ? 'Onbekend'
                                : typeOfExecution === 'Z'
                                ? 'Zelf doen'
                                : 'Laten doen'}
                        </div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && savingsGas ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Besparing gas:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{savingsGas}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && savingsElectricity ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">Besparing elektriciteit:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{savingsElectricity}</div>
                        <div className="col-sm-1">&nbsp;</div>
                    </div>
                </div>
            ) : null}
            {(!props.showEdit || props.showCheckboxList) && co2Savings ? (
                <div
                    className={`row border ${props.highlightLine}`}
                    onMouseEnter={() => props.onLineEnter()}
                    onMouseLeave={() => props.onLineLeave()}
                    onClick={() => (!props.showCheckboxList ? props.openEdit() : {})}
                >
                    <div>
                        {props.showCheckboxList && <div className="col-sm-1">&nbsp;</div>}
                        <div className="col-sm-1">&nbsp;</div>
                        <div className="col-sm-2">CO2 besparing:</div>
                        <div className={props.showCheckboxList ? 'col-sm-7' : 'col-sm-8'}>{co2Savings}</div>
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
        hasHoomDossierLink: state.housingFileDetails.hoomBuildingId != null ? true : false,
    };
};

export default connect(mapStateToProps, null)(HousingFileSpecificationView);
