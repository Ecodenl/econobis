import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import ContactImportUploadCSV from './ContactImportUploadCSV';
import ButtonText from '../../../components/button/ButtonText';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactImportValidationRow from './ContactImportValidationRow';
import InputSelect from '../../../components/form/InputSelect';
import { hashHistory } from 'react-router';

class ContactImportFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validationData: false,
            upload: false,
            attachment: false,
            hasError: true,
            uploading: false,
            importing: false,
            suppliers: [],
            supplier: false,
        };
    }

    componentDidMount() {
        ContactsAPI.getContactsToImportSuppliers().then(payload => {
            this.setState({
                suppliers: payload,
            });
        });
    }

    toggleUpload = () => {
        this.setState({
            upload: !this.state.upload,
        });
    };

    import = () => {
        this.setState({
            ...this.state,
            importing: true,
        });
        // If no errors send form
        const data = new FormData();

        data.append('attachment', this.state.attachment);

        ContactsAPI.importfromenergiesupplier(data).then(payload => {
            hashHistory.push(`/contacten`);
        });
    };

    handleSupplierChange = event => {
        const target = event.target;
        const value = target.value;

        const supplier = this.state.suppliers.find(supplier => supplier.code_ref === value);

        this.setState({
            ...this.state,
            supplier: supplier,
        });
    };

    handleSubmit = () => {
        this.setState({
            ...this.state,
            uploading: true,
        });

        const data = new FormData();

        data.append('attachment', this.state.attachment);
        data.append('supplier', this.state.supplier.file_header);

        ContactsAPI.validateImportfromenergiesupplier(data).then(payload => {
            const hasError = payload.data.find(item => {
                return item.prio === 1;
            });

            this.setState({
                ...this.state,
                validationData: payload.data,
                hasError: !!hasError,
                uploading: false,
            });
        });
    };

    addAttachment = file => {
        this.setState({
            ...this.state,
            attachment: file[0],
        });

        //We need some time before attachment is processed.
        setTimeout(() => {
            this.handleSubmit();
        }, 500);
    };

    render() {
        return (
            <Panel className={'panel-grey'}>
                {(!this.state.supplier && (
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Energie leverancier'}
                                size={'col-sm-6'}
                                name={'typeId'}
                                options={this.state.suppliers}
                                value={'this.state.supplier'}
                                optionValue={'code_ref'}
                                optionName={'supplier'}
                                onChangeAction={this.handleSupplierChange}
                            />
                        </div>
                    </PanelBody>
                )) ||
                    (this.state.validationData && (
                        <PanelBody>
                            <DataTable>
                                <DataTableHead>
                                    <DataTableHeadTitle title={'Veld'} width={'20%'} />
                                    <DataTableHeadTitle title={'Waarde'} width={'20%'} />
                                    <DataTableHeadTitle title={'Regel'} width={'20%'} />
                                    <DataTableHeadTitle title={'Bericht'} width={'40%'} />
                                </DataTableHead>
                                <DataTableBody>
                                    {this.state.validationData.length === 0 ? (
                                        <tr>
                                            <td colSpan={4}>Geen regels gevonden!</td>
                                        </tr>
                                    ) : (
                                        this.state.validationData.map((data, i) => {
                                            return <ContactImportValidationRow key={i} data={data} />;
                                        })
                                    )}
                                </DataTableBody>
                            </DataTable>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="btn-group btn-group-flex margin-small" role="group">
                                        <ButtonText
                                            loading={this.state.uploading}
                                            buttonText={'Upload CSV'}
                                            onClickAction={this.toggleUpload}
                                        />
                                        {!this.state.hasError && (
                                            <ButtonText
                                                loading={this.state.importing}
                                                buttonText={'Importeren'}
                                                onClickAction={this.import}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </PanelBody>
                    )) || (
                        <PanelBody>
                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        'Hier kunt u een CSV uploaden om contacten te importeren. De CSV moet het volgende formaat hebben:'
                                    }
                                </div>
                            </div>
                            <div className="row margin-10-top margin-10-bottom">
                                <div className="col-md-12">
                                    <span>
                                        <strong>{this.state.supplier.file_header}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ButtonText
                                        loading={this.state.uploading}
                                        buttonText={'Upload CSV'}
                                        onClickAction={this.toggleUpload}
                                    />
                                </div>
                            </div>
                        </PanelBody>
                    )}
                {this.state.upload && (
                    <ContactImportUploadCSV toggleShowNew={this.toggleUpload} addAttachment={this.addAttachment} />
                )}
            </Panel>
        );
    }
}

export default ContactImportFormGeneral;
