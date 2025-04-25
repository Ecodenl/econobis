import React, { useEffect, useState } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DistrictAPI from '../../../api/district/DistrictAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DistrictListItem from './DistrictListItem';
import { useNavigate } from 'react-router-dom';

export default function DistrictsListApp() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [districts, setDistricts] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [statusFilter, setStatusFilter] = useState(0);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        DistrictAPI.fetchDistricts()
            .then(data => {
                setDistricts(data);
                setLoading(false);
            })
            .catch(() => {
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
    };

    const getFilteredDistricts = () => {
        if (statusFilter === '') {
            return districts;
        }

        return districts.filter(district => district.closed === (statusFilter === '1'));
    };

    return (
        <Panel className="col-md-12">
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'refresh'} onClickAction={fetch} />
                                <ButtonIcon
                                    iconName={'plus'}
                                    onClickAction={() => navigate(`/afspraak-kalender/nieuw`)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-center table-title">Afspraakkalenders</h3>
                        </div>
                        <div className="col-md-4" />
                    </div>
                </div>

                <div className="col-md-12 margin-10-top">
                    <DataTable>
                        <DataTableHead>
                            <tr className="thead-title">
                                <DataTableHeadTitle title={'Naam'} width={'65%'} />
                                <DataTableHeadTitle title={'Status'} width={'30%'} />
                                <DataTableHeadTitle title={''} width={'5%'} />
                            </tr>
                        </DataTableHead>
                        <DataTableBody>
                            <tr className="thead-filter">
                                <th />
                                <th>
                                    <select
                                        className="form-control input-sm"
                                        value={statusFilter}
                                        onChange={e => setStatusFilter(e.target.value)}
                                    >
                                        <option />
                                        <option key={1} value={0}>
                                            {'Open'}
                                        </option>
                                        <option key={2} value={1}>
                                            {'Gesloten'}
                                        </option>
                                    </select>
                                </th>
                                <th />
                            </tr>

                            {loadingText() ? (
                                <tr>
                                    <td colSpan={3}>{loadingText()}</td>
                                </tr>
                            ) : (
                                getFilteredDistricts().map(district => {
                                    return <DistrictListItem key={district.id} district={district} />;
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                </div>
            </PanelBody>
        </Panel>
    );
}
