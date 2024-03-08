import React from 'react';
import { connect } from 'react-redux';

import RevenuesKwhListFormItem from './RevenuesKwhListFormItem';

const RevenuesKwhListFormList = ({ revenuesKwh }) => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-4">Project</div>
                <div className="col-sm-2">Soort</div>
                <div className="col-sm-3">Periode</div>
                <div className="col-sm-2">Status</div>
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
        revenuesKwh: state.participantProjectDetails.relatedRevenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuesKwhListFormList);
