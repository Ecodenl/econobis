import React, { useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import IntakesListHead from './IntakesListHead';
import IntakesListFilter from './IntakesListFilter';
import IntakesListItem from './IntakesListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';
import IntakesBulkDelete from '../../intake/list/IntakesBulkDelete';
import IntakesBulkUpdate from '../../intake/list/IntakesBulkUpdate';

function IntakesList({
    intakes,
    multiSelectEnabled,
    setMultiSelectDisabled,
    intakesPagination,
    onSubmitFilter,
    refreshIntakesData,
    handlePageClick,
}) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [intakeIds, setIntakeIds] = useState([]);
    const [showBulkDelete, setShowBulkDelete] = useState(false);
    const [showBulkUpdate, setShowBulkUpdate] = useState(false);
    const permissions = useSelector(state => state.meDetails.permissions);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    useEffect(() => {
        if (!multiSelectEnabled) {
            setCheckedAll(false);
            setIntakeIds([]);
        }
    }, [multiSelectEnabled]);

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let intakeIds = [];

        if (isChecked) {
            intakeIds = meta.intakeIdsTotal;
        }
        setIntakeIds(intakeIds);
        setCheckedAll(isChecked);
    }

    function toggleIntakeCheck(event) {
        const isChecked = event.target.checked;
        const intakeId = Number(event.target.name);

        if (isChecked) {
            setIntakeIds([...intakeIds, intakeId]);
            checkAllIntakesAreChecked();
        } else {
            setIntakeIds([...intakeIds.filter(item => item !== intakeId)]);
            setCheckedAll(false);
        }
    }

    function checkAllIntakesAreChecked() {
        setCheckedAll(intakeIds.length === meta.intakeIdsTotal.length);
    }

    function showBulkDeleteModal(id, name) {
        setShowBulkDelete(true);
    }
    function closeBulkDeleteModal(id, name) {
        setShowBulkDelete(false);
    }
    function confirmActionsBulkDelete(id, name) {
        setShowBulkDelete(false);
        setMultiSelectDisabled();
        refreshIntakesData();
    }
    function showBulkUpdateModal(id, name) {
        setShowBulkUpdate(true);
    }
    function closeBulkUpdateModal(id, name) {
        setShowBulkUpdate(false);
    }
    function confirmActionsBulkUpdate(id, name) {
        setShowBulkUpdate(false);
        setMultiSelectDisabled();
        refreshIntakesData();
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

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
                {multiSelectEnabled && permissions.manageIntake && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">
                                Geselecteerde intakes: {numberSelectedNumberTotal}
                            </div>
                        </div>
                        <div className="col-md-12 margin-10-bottom">
                            <div className="btn-group" role="group">
                                <ButtonIcon
                                    iconName={'pencil'}
                                    onClickAction={showBulkUpdateModal}
                                    title="Bijwerken geselecteerde intakes"
                                />
                                <ButtonIcon
                                    iconName={'trash'}
                                    onClickAction={showBulkDeleteModal}
                                    title="Verwijderen geselecteerde intakes"
                                />
                            </div>
                        </div>
                    </>
                )}

                <DataTable>
                    <DataTableHead>
                        <IntakesListHead
                            showCheckbox={multiSelectEnabled}
                            refreshIntakesData={() => refreshIntakesData()}
                        />
                        <IntakesListFilter
                            onSubmitFilter={onSubmitFilter}
                            showCheckbox={multiSelectEnabled}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={multiSelectEnabled ? 7 : 6}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(intake => {
                                return (
                                    <IntakesListItem
                                        key={intake.id}
                                        {...intake}
                                        showCheckbox={multiSelectEnabled}
                                        toggleIntakeCheck={toggleIntakeCheck}
                                        intakeIds={intakeIds}
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
            {showBulkDelete && (
                <IntakesBulkDelete
                    confirmActionsBulkDelete={confirmActionsBulkDelete}
                    closeBulkDeleteModal={closeBulkDeleteModal}
                    intakeIds={intakeIds}
                />
            )}
            {showBulkUpdate && (
                <IntakesBulkUpdate
                    confirmActionsBulkUpdate={confirmActionsBulkUpdate}
                    closeBulkUpdateModal={closeBulkUpdateModal}
                    intakeIds={intakeIds}
                />
            )}
        </div>
    );
}

export default IntakesList;
