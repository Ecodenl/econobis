import React from 'react';
import { connect } from 'react-redux';

import RevenuePartsKwhListFormItem from './RevenuePartsKwhListFormItem';

const RevenuePartsKwhListFormList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Begin periode</div>
                <div className="col-sm-2">Eind periode</div>
                <div className="col-sm-1">Status</div>
                <div className="col-sm-2">kWh concept</div>
                <div className="col-sm-2">kWh definitief</div>
                <div className="col-sm-2">kWh verwerkt</div>
                <div className="col-sm-1" />
            </div>
            {props.revenuesKwh.partsKwh.length > 0 ? (
                props.revenuesKwh.partsKwh.map(revenuePartKwh => {
                    return <RevenuePartsKwhListFormItem key={revenuePartKwh.id} revenuePartKwh={revenuePartKwh} />;
                })
            ) : (
                <div>Geen opbrengsten standen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhListFormList);
