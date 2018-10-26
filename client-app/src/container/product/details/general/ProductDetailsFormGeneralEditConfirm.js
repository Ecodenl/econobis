import React, {Component} from 'react';
import {updateProduct} from "../../../../actions/product/ProductDetailsActions";
import {connect} from 'react-redux';
import Modal from '../../../../components/modal/Modal';

class ProductDetailsFormGeneralEditConfirm extends Component {
    constructor(props) {
        super(props);
    };

    confirmAction = event => {
        this.props.updateProduct(this.props.product, this.props.switchToView);
        this.props.closeModal();
    };


    render() {
        return (
            <Modal
                modalClassName={'modal-lg'}
                closeModal={this.props.closeModal}
                confirmAction={this.confirmAction}
                title="Product wijzigen"
                buttonConfirmText={"Opslaan"}
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Weet je zeker dat je dit product wilt aanpassen? Dit zal effect hebben op de orders en de te verzenden facturen waar dit product in gebruik is.
                    </span>
                    </div>
                </div>
            </Modal>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    updateProduct: (product, switchToView) => {
        dispatch(updateProduct(product, switchToView));
    },
});

export default connect(null, mapDispatchToProps)(ProductDetailsFormGeneralEditConfirm);