import React from 'react';
import ProcessesItem from './ProcessesItem';

const ProcessesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-6">Melding</div>
                <div className="col-sm-4">Categorie</div>
            </div>
            {props.jobs.length > 0 ? (
                props.jobs.map(job => {
                    return <ProcessesItem key={job.id} job={job} />;
                })
            ) : (
                <div>Geen resultaten!</div>
            )}
        </div>
    );
};

export default ProcessesList;
