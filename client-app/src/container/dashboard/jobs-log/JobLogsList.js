import React from 'react';

import JobLogsItem from "./JobLogsItem";

const JobLogsView = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-8">Melding</div>
                <div className="col-sm-4">Datum</div>
            </div>
            {
                props.jobs.length > 0 ?
                    props.jobs.map(job => {
                        return <JobLogsItem
                            key={job.id}
                            job={job}
                        />;
                    })
                    :
                    <div>Geen gegevens bekend.</div>
            }
        </div>
    );
};

export default JobLogsView;

