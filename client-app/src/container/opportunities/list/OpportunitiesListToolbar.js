import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '../../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const OpportunitiesListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <OpportunitiesListToolbar {...props} navigate={navigate} />;
};

class OpportunitiesListToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { meta = {} } = this.props.opportunities;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={'refresh'} onClickAction={this.props.resetOpportunitiesFilters} />
                        <ButtonIcon iconName={'check'} onClickAction={this.props.toggleMultiSelectEnabled} />
                        <ButtonIcon iconName={'download'} onClickAction={this.props.getCSV} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Kansen</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        opportunities: state.opportunities.list,
    };
};

export default connect(mapStateToProps)(OpportunitiesListToolbarWrapper);
