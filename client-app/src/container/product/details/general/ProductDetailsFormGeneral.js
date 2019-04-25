import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductDetailsFormGeneralEdit from './ProductDetailsFormGeneralEdit';
import ProductDetailsFormGeneralView from './ProductDetailsFormGeneralView';

class ProductDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <ProductDetailsFormGeneralEdit switchToView={this.switchToView} />
                ) : (
                    <ProductDetailsFormGeneralView switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productDetails: state.productDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(ProductDetailsFormGeneral);
