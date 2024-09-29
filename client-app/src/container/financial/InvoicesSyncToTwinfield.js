import React, { Component } from 'react';

import Modal from '../../components/modal/Modal';
import ViewText from '../../components/form/ViewText';

class InvoicesSyncToTwinfield extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { fromDateSent } = this.props;

        return (
            <Modal
                buttonConfirmText="Nota's naar Twinfield exporteren"
                closeModal={this.props.closeModal}
                confirmAction={this.props.confirmAction}
                title="Nota's naar Twinfield exporteren"
            >
                <div className="row">
                    <ViewText
                        className={'form-group col-sm-12'}
                        label="Synchroniseer nota's vanaf"
                        name="fromDateSent"
                        value={fromDateSent}
                    />
                </div>
            </Modal>
        );
    }
}

export default InvoicesSyncToTwinfield;
