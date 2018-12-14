import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import EmailTemplatesItem from './EmailTemplatesItem';
import {connect} from "react-redux";

class EmailTemplatesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            }
        };
    }
    render() {

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van e-mailtemplates.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.emailTemplates.length === 0) {
            loadingText = 'Geen e-mailtemplates gevonden!';
        }
        else {
            loading = false;
        }

    return (
        <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={"30%"}/>
                            <DataTableHeadTitle title={'Onderwerp'} width={"30%"}/>
                            <DataTableHeadTitle title={'Gemaakt door'} width={"35%"} />
                            <DataTableHeadTitle title={''} width={"5%"} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            loading ? (
                                <tr><td colSpan={4}>{loadingText}</td></tr>
                            ) : (
                                this.props.emailTemplates.map((template) => {
                                    return <EmailTemplatesItem
                                        key={template.id}
                                        {...template}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
        </div>
    );
    };
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(EmailTemplatesList);