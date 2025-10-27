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
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const ContactImportFormGeneralWrapper = props => {
    const navigate = useNavigate();
    return <ContactImportFormGeneral {...props} navigate={navigate} />;
};

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
        };
    }

    toggleUpload = () => {
        this.setState({
            upload: !this.state.upload,
        });
    };

    handleSubmit = () => {
        this.setState({
            ...this.state,
            uploading: true,
        });

        const data = new FormData();

        data.append('attachment', this.state.attachment);

        ContactsAPI.validateImport(data).then(payload => {
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

    import = () => {
        this.setState({
            ...this.state,
            importing: true,
        });
        // If no errors send form
        const data = new FormData();

        data.append('attachment', this.state.attachment);

        ContactsAPI.import(data).then(payload => {
            this.props.navigate(`/contacten`);
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
                {this.state.validationData ? (
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
                                        buttonText={'Upload CSV opnieuw'}
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
                ) : (
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
                                    <strong>
                                        aanspreektitel_id;initialen;voornaam;tussenvoegsel;achternaam;straat;woonplaats;huisnummer;huisnummer_toevoeging;postcode;telefoonnummer;telefoonnummer2;email;email2;iban;iban_tnv
                                    </strong>
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

export default ContactImportFormGeneralWrapper;
