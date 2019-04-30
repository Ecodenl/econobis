import React from 'react';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const HousingFilesListToolbar = props => {
    const { meta = {} } = props.housingFiles;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetHousingFileFilters} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Woningdossiers</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFiles: state.housingFiles.list,
    };
};

export default connect(
    mapStateToProps,
    null
)(HousingFilesListToolbar);
