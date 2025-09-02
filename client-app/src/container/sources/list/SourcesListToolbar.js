import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const SourcesListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <SourcesListToolbar {...props} navigate={navigate} />;
};

class SourcesListToolbar extends Component {
    // newSource = () => {
    //     this.props.navigate(`/aanmeldingsbron/nieuw`);
    // };

    render() {
        let { sourcesCount, refreshSourcesData, permissions } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshSourcesData} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Aanmeldingsbronnen</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {sourcesCount}</div>
                </div>
            </div>
        );
    }
}

SourcesListToolbar.propTypes = {
    sourcesCount: PropTypes.any,
    refreshSourcesData: PropTypes.any,
    permissions: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(SourcesListToolbarWrapper);
