import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PortalDashboardWidgetOrderRow from './PortalDashboardWidgetOrderRow';
import update from 'immutability-helper';

const PortalDashboardWidgetOrderTable = ({ columns, data, edit, handleInputChange, removeWidget }) => {
    const [records, setRecords] = useState(data);

    useEffect(
        function() {
            setRecords(data);
        },
        [data]
    );

    useEffect(
        function() {
            for (let [index, value] of records.entries()) {
                value.order = index + 1;
            }
        },
        [records]
    );

    const getRowId = React.useCallback(row => {
        return row.id;
    }, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        data: records,
        columns,
        getRowId,
    });

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex];
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()} className={'table table-condensed table-hover table-striped col-xs-12'}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={'thead-title'}>
                            {edit && <th />}
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            {edit && <th />}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) =>
                            prepareRow(row) || (
                                <PortalDashboardWidgetOrderRow
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                    edit={edit}
                                    handleInputChange={handleInputChange}
                                    removeWidget={removeWidget}
                                    {...row.getRowProps()}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    );
};

export default PortalDashboardWidgetOrderTable;