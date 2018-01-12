import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import EmailTemplatesItem from './EmailTemplatesItem';

const EmailTemplatesList = props => {
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
                            props.emailTemplates.length === 0 ? (
                                <tr><td colSpan={4}>Geen email templates gevonden!</td></tr>
                            ) : (
                                props.emailTemplates.map((template) => {
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

export default EmailTemplatesList;