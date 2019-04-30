import React, { Component } from 'react';

import MeasureDetailsConclusionView from './MeasureDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { connect } from 'react-redux';

class MeasureDetailsConclusionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDiv: '',
        };
    }

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    <MeasureDetailsConclusionView />
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MeasureDetailsConclusionForm);
