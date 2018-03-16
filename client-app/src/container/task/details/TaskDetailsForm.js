import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import TaskDetailsFormGeneral from './general/TaskDetailsFormGeneral';
import TaskDetailsFormProperties from './properties/TaskDetailsFormProperties';
import TaskDetailsFormConclusion from "./conclusion/TaskDetailsFormConclusion";
import moment from "moment/moment";
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";

class TaskDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.taskDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    { this.props.taskDetails.deletedAt &&
                    <PanelDeletedItem
                        text={`Deze taak/notitie is verwijderd op ${moment(this.props.taskDetails.deletedAt).format('L')}.`}
                    />
                    }
                    <TaskDetailsFormGeneral />
                    <TaskDetailsFormProperties />
                    <TaskDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
    };
};

export default connect(mapStateToProps, null)(TaskDetailsForm);
