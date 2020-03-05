import React, { Component } from 'react';
import ParticipantReport from './list/ParticipantReport';
import RevenueDistributionReport from './list/RevenueDistributionReport';

class ProcessesApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const path = this.props.route.path;

        switch (path) {
            case 'processen/deelnemer-rapportage':
                return <ParticipantReport />;
            case 'processen/opbrengstverdeling-rapportage':
                return <RevenueDistributionReport />;
        }
    }
}

export default ProcessesApp;
