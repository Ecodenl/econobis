import React, { Component } from 'react';

import Modal from '../../components/modal/Modal';
import InputDate from '../../components/form/InputDate';
import ViewText from '../../components/form/ViewText';

class InvoicesSyncFromTwinfield extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { oldestUnpaidInvoiceDate, fromDateSent } = this.props;

        return (
            <Modal
                buttonConfirmText="Betalingen van Twinfield ophalen"
                closeModal={this.props.closeModal}
                confirmAction={this.props.confirmAction}
                title="Betalingen van Twinfield ophalen"
            >
                <div className="row">
                    <div className={'col-sm-12 margin-10-bottom'}>
                        <span>Synchroniseer betalingen van nota's met een (verzend)datum vanaf opgegeven datum.</span>
                    </div>
                </div>
                <div className="row">
                    <ViewText
                        className={'form-group col-sm-12'}
                        label="Oudste nota datum met status niet betaald"
                        name="oldestUnpaidInvoiceDate"
                        value={oldestUnpaidInvoiceDate}
                    />
                    <InputDate
                        divSize={'col-sm-12'}
                        label="Synchroniseer betalingen vanaf"
                        name="fromDateSent"
                        value={fromDateSent}
                        disabledBefore={fromDateSent}
                        onChangeAction={this.props.handleInputChangeDate}
                        required={'required'}
                        error={this.props.errors.fromDateSent}
                    />
                </div>
            </Modal>
        );
    }
}

export default InvoicesSyncFromTwinfield;
