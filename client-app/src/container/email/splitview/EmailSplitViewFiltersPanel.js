import React, {} from 'react';
import {useSelector} from "react-redux";

export default function EmailSplitViewFiltersPanel({filters, setFilters}) {
    const statuses = useSelector((state) => state.systemData.emailStatuses);

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-small">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-condensed table-hover table-striped col-xs-12"
                               style={{marginBottom: '0px'}}>
                            <thead>
                            <tr className="thead-title">
                                <th className="" width="10%">Van e-mail</th>
                                <th className="" width="10%">Gekoppeld contact</th>
                                <th className="" width="15%">Onderwerp</th>
                                <th className="" width="7%">Van</th>
                                <th className="" width="7%">T/m</th>
                                <th className="" width="10%">Status</th>
                                <th className="" width="10%">Verantwoordelijke</th>
                                <th className="" width="11%">Mailbox</th>
                                <th className="" width="10%">Aan</th>
                                <th className="" width="5%">Bijlage</th>
                            </tr>
                            <tr className="thead-filter">
                                <th><input type="text" className="form-control input-sm" value={filters.from} onChange={(e) => {setFilters({...filters, from: e.target.value})}}/></th>
                                <th><input type="text" className="form-control input-sm" value={filters.contact} onChange={(e) => {setFilters({...filters, contact: e.target.value})}}/></th>
                                <th><input type="text" className="form-control input-sm" value={filters.subject} onChange={(e) => {setFilters({...filters, subject: e.target.value})}}/></th>
                                <th><input type="date" className="form-control input-sm" value={filters.dateSentStart} onChange={(e) => {setFilters({...filters, dateSentStart: e.target.value, fetch: true})}}/></th>
                                <th><input type="date" className="form-control input-sm" value={filters.dateSentEnd} onChange={(e) => {setFilters({...filters, dateSentEnd: e.target.value, fetch: true})}}/></th>
                                <th><select className="form-control input-sm" value={filters.status} onChange={(e) => {setFilters({...filters, status: e.target.value, fetch: true})}}>
                                    <option></option>
                                    {
                                        statuses.map((status) => (
                                            <option key={status.id} value={status.id}>{status.name}</option>
                                        ))
                                    }
                                </select></th>
                                <th><input type="text" className="form-control input-sm" value={filters.responsible} onChange={(e) => {setFilters({...filters, responsible: e.target.value})}}/></th>
                                <th><input type="text" className="form-control input-sm" value={filters.mailbox} onChange={(e) => {setFilters({...filters, mailbox: e.target.value})}}/></th>
                                <th><input type="text" className="form-control input-sm" value={filters.to} onChange={(e) => {setFilters({...filters, to: e.target.value})}}/></th>
                                <th><select className="form-control input-sm" value={filters.attachment} onChange={(e) => {setFilters({...filters, attachment: e.target.value, fetch: true})}}>
                                    <option></option>
                                    <option value={1}>Ja</option>
                                </select></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

