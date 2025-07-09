import React from 'react';
import { connect } from 'react-redux';

import TaskDetailsFormPropertyItem from './TaskDetailsFormPropertyItem';

const TaskDetailsFormPropertiesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-6">Kenmerk</div>
                <div className="col-sm-5">Waarde</div>
                <div className="col-sm-1" />
            </div>
            {props.properties.length > 0 ? (
                props.properties.map(property => {
                    return <TaskDetailsFormPropertyItem key={property.id} property={property} />;
                })
            ) : (
                <div>Geen extra kenmerken bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        properties: state.taskDetails.properties || [],
    };
};
export default connect(mapStateToProps)(TaskDetailsFormPropertiesList);
