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
                  Let op. Een wijziging in een product kan grote gevolgen hebben op je lopende facturering. Dus bedenk goed wat je wilt voordat je een wijziging doorvoert.
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