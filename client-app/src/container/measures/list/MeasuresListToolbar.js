import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const MeasuresListToolbar = (props) => {
    const newMeasure = () => {
        hashHistory.push('maatregel/nieuw');
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                    {permissions.manageMeasure &&
                    <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newMeasure}/>
                    }
                </div>

            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Maatregelen</h3></div>
            <div className="col-md-4"/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(MeasuresListToolbar);

