import React, { Component, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import IntakesListHead from './IntakesListHead';
import IntakesListFilter from './IntakesListFilter';
import IntakesListItem from './IntakesListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';
import Icon from 'react-icons-kit';
import { hashHistory } from 'react-router';
import { share } from 'react-icons-kit/fa/share';
import { setBulkEmailToContactIds } from '../../../actions/email/BulkMailActions';

function IntakesList({
    intakes,
    showCheckboxList,
    onSubmitFilter,
    checkedAllCheckboxes,
    handlePageClick,
    intakesPagination,
    selectAllCheckboxes,
}) {
    const [intakeIds, setIntakeIds] = useState([]);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            props.onSubmitFilter();
        }
    };

    function updateSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }
    function deleteSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }

    const { data = [], meta = {} } = intakes;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van intakes.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen intakes gevonden!';
    } else {
        loading = false;
    }

    let numberSelectedNumberTotal = 0;

    if (intakeIds) {
        if (meta && meta.intakeIdsTotal) {
            numberSelectedNumberTotal = intakeIds.length + '/' + meta.intakeIdsTotal.length;
        } else {
            numberSelectedNumberTotal = intakeIds.length;
        }
    }

    function bulkEmailContacts() {
        let contactIds = [];
        intakes.data.map(intake => intake.checked === true && contactIds.push(intake.contactId));

        setBulkEmailToContactIds(contactIds);

        hashHistory.push('/email/nieuw/bulk');
    }

    return (
        <form onKeyUp={handleKeyUp}>
            {showCheckboxList && (
                <>
                    <div className="col-md-12">
                        <div className="alert alert-success">Geselecteerde intakes: {numberSelectedNumberTotal}</div>
                    </div>

                    <div className="col-md-12 margin-10-bottom">
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <Icon size={12} icon={share} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a onClick={bulkEmailContacts}>Contacten emailen</a>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-group" role="group">
                            <ButtonIcon
                                iconName={'pencil'}
                                onClickAction={updateSelection}
                                title="Bijwerken geselecteerde intakes"
                            />
                            <ButtonIcon
                                iconName={'trash'}
                                onClickAction={deleteSelection}
                                title="Verwijderen geselecteerde intakes"
                            />
                        </div>
                    </div>
                </>
            )}

            <DataTable>
                <DataTableHead>
                    <IntakesListHead showCheckbox={showCheckboxList} refreshIntakesData={() => refreshIntakesData()} />
                    <IntakesListFilter
                        showCheckbox={showCheckboxList}
                        selectAllCheckboxes={() => selectAllCheckboxes()}
                        onSubmitFilter={onSubmitFilter}
                    />
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={6}>{loadingText}</td>
                        </tr>
                    ) : (
                        data.map(intake => {
                            return (
                                <IntakesListItem
                                    key={intake.id}
                                    {...intake}
                                    showCheckbox={showCheckboxList}
                                    // checkedAllCheckboxes={checkedAllCheckboxes}
                                />
                            );
                        })
                    )}
                </DataTableBody>
            </DataTable>
            <div className="col-md-4 col-md-offset-4">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={meta.total}
                    initialPage={intakesPagination.page}
                />
            </div>
        </form>
    );
}

export default IntakesList;
