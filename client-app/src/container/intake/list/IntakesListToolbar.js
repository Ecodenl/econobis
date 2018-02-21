import React from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../components/button/ButtonIcon';

const IntakesListToolbar = props => {
    const { meta = {} } = props.intakes;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.resetIntakeFilters} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Intakes</h3></div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: { meta.total || 0 }</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        intakes: state.intakes.list,
    };
};

export default connect(mapStateToProps, null)(IntakesListToolbar);