import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DistrictAPI from "../../../api/district/DistrictAPI";
import ButtonIcon from "../../../components/button/ButtonIcon";
import DataTable from "../../../components/dataTable/DataTable";
import DataTableHead from "../../../components/dataTable/DataTableHead";
import DataTableHeadTitle from "../../../components/dataTable/DataTableHeadTitle";
import DataTableBody from "../../../components/dataTable/DataTableBody";
import DistrictListItem from "./DistrictListItem";
import {hashHistory} from "react-router";

export default function DistrictsListApp() {
    const [isLoading, setLoading] = useState(true);
    const [districts, setDistricts] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        DistrictAPI.fetchDistricts().then((data) => {
            setDistricts(data);
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

        if (districts.length === 0) {
            return 'Geen afspraakkalenders gevonden!';
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
                                <ButtonIcon iconName={'glyphicon-plus'}
                                            onClickAction={() => hashHistory.push(`/afspraak-kalender/nieuw`)}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-center table-title">Afspraakkalenders</h3>
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
                                districts.map(district => {
                                    return <DistrictListItem key={district.id} district={district} onDelete={fetch}/>;
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                </div>
            </PanelBody>
        </Panel>
    );
}
