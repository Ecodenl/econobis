import React from 'react';
import Table from 'react-bootstrap/Table';
import valueBasedOnTypePresenter from '../../../../helpers/ValueBasedOnTypePresenter';
import {FaInfoCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

function RegistrationDetailsProjectTable({ fields }) {
    if (!fields || fields.length === 0) return <p>Geen projectdetails bekend</p>;

    return (
        <Table>
            <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td>
                            <strong>{field.label}</strong>
                            &nbsp;
                            {field.dataTip ? (
                                <>
                                    <FaInfoCircle
                                        color={'blue'}
                                        size={'15px'}
                                        data-tip={`${field.dataTip}`}
                                        data-for={`deelname-${index}`}
                                    />
                                    <ReactTooltip
                                        id={`deelname-${index}`}
                                        effect="float"
                                        place="right"
                                        multiline={true}
                                        aria-haspopup="true"
                                    />
                                </>
                            ) : (
                                ''
                            )}
                        </td>
                        <td>{valueBasedOnTypePresenter(field)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RegistrationDetailsProjectTable;
