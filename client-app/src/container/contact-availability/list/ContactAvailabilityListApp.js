import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import DataTable from "../../../components/dataTable/DataTable";
import DataTableHead from "../../../components/dataTable/DataTableHead";
import DataTableHeadTitle from "../../../components/dataTable/DataTableHeadTitle";
import DataTableBody from "../../../components/dataTable/DataTableBody";
import ContactAvailabilityListItem from "./ContactAvailabilityListItem";
import InspectionPersonAPI from "../../../api/contact/InspectionPersonAPI";

export default function ContactAvailabilityListApp() {
    const [isLoading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        InspectionPersonAPI.getCoachPeek().then((data) => {
            setContacts(data);
            setLoading(false);
        }).catch(() => {
            setErrorText('Er is iets misgegaan met ophalen van de afspraakkalenders.');
            setLoading(false);
        });
    };

    const loadingText = () => {
        if (errorText) {
            return errorText;
        }

        if (isLoading) {
            return 'Gegevens aan het laden.';
        }

        if (contacts.length === 0) {
            return 'Geen contacten gevonden!';
        }

        return '';
    }

    return (
        <Panel className="col-md-12">
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={fetch}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-center table-title">Instellen beschikbaarheden</h3>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                </div>

                <div className="col-md-12 margin-10-top">
                    <DataTable>
                        <DataTableHead>
                            <tr className="thead-title">
                                <DataTableHeadTitle title={'Naam'} width={'95%'}/>
                                <DataTableHeadTitle title={''} width={'5%'}/>
                            </tr>
                        </DataTableHead>
                        <DataTableBody>
                            {loadingText() ? (
                                <tr>
                                    <td colSpan={2}>{loadingText()}</td>
                                </tr>
                            ) : (
                                contacts.map(contact => {
                                    return <ContactAvailabilityListItem key={contact.id} contact={contact}/>;
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                </div>
            </PanelBody>
        </Panel>
    );
}
