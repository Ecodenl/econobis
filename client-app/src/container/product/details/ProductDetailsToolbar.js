import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ProductDeleteItem from './ProductDeleteItem';

// Functionele wrapper voor de class component
const ProductToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ProductToolbar {...props} navigate={navigate} />;
};

class ProductToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
        this.props.navigate('/producten');
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                        <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Product: {this.props.name}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <ProductDeleteItem
                        closeDeleteItemModal={this.hideDeleteModal}
                        name={this.props.name}
                        id={this.props.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.productDetails.name,
        id: state.productDetails.id,
    };
};

export default connect(mapStateToProps, null)(ProductToolbarWrapper);
