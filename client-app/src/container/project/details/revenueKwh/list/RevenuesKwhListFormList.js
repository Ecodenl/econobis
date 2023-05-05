import React from 'react';
import { connect } from 'react-redux';

import RevenuesKwhListFormItem from './RevenuesKwhListFormItem';

const RevenuesKwhListFormList = ({ revenuesKwh }) => {
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
            {revenuesKwh.length > 0 ? (
                revenuesKwh.map(revenueKwh => {
                    return <RevenuesKwhListFormItem key={revenueKwh.id} revenueKwh={revenueKwh} />;
                })
            ) : (
                <div>Geen opbrengsten bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuesKwh: state.projectDetails.revenuesKwh,
        projectTypeCodeRef: state.projectDetails.projectType?.codeRef,
    };
};

export default connect(mapStateToProps)(RevenuesKwhListFormList);
