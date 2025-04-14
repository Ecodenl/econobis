import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import CostCenterDeleteItem from './CostCenterDeleteItem';

// Functionele wrapper voor de class component
const CostCenterDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <CostCenterDetailsToolbar {...props} navigate={navigate} />;
};

class CostCenterDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        let { description, id } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Kostenplaats: {description}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <CostCenterDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        description={description}
                        id={id}
                        deleteCostCenter={this.props.deleteCostCenter}
                    />
                )}
            </div>
        );
    }
}

CostCenterDetailsToolbar.propTypes = { description: PropTypes.any };

export default CostCenterDetailsToolbarWrapper;
