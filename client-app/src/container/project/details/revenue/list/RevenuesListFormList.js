import React from 'react';
import { connect } from 'react-redux';

import RevenuesListFormItem from './RevenuesListFormItem';

const RevenuesListFormList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-1">Soort</div>
                <div className="col-sm-2">Begin periode</div>
                <div className="col-sm-2">Eind periode</div>
                <div className="col-sm-2">Uitgekeerd op</div>
                <div className="col-sm-2">Type opbrengst</div>
                <div className="col-sm-1">Bedrag</div>
                <div className="col-sm-1">kWh</div>
                <div className="col-sm-1" />
            </div>
            {props.revenues.length > 0 ? (
                props.revenues.map(revenue => {
                    return <RevenuesListFormItem key={revenue.id} revenue={revenue} />;
                })
            ) : (
                <div>Geen opbrengsten bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenues: state.projectDetails.revenues,
    };
};

export default connect(mapStateToProps)(RevenuesListFormList);
