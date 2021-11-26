import React from 'react';
import { useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PortalDashboardWidgetOrderRow from './PortalDashboardWidgetOrderRow';

const PortalDashboardWidgetOrderTable = ({ columns, data, edit, handleInputChange, removeWidget }) => {
    const [records, setRecords] = React.useState(data);

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
        setRecords();
        // update(records, {
        //     $splice: [
        //         [dragIndex, 1],
        //         [hoverIndex, 0, dragRecord],
        //     ],
        // })
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()} className={'table table-condensed table-hover table-striped col-xs-12'}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={'thead-title'}>
                            <th></th>
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
