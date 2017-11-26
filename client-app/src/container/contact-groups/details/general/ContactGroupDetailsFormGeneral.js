import React, { Component} from 'react';
import {connect} from 'react-redux';

import ContactGroupDetailsFormGeneralEdit from './ContactGroupDetailsFormGeneralEdit';
import ContactGroupDetailsFormGeneralView from './ContactGroupDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class ContactGroupDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        this.setState({
            activeDiv: '',
        });
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    <div className="col-md-12">
                        {
                            this.state.showEdit ?
                                <ContactGroupDetailsFormGeneralEdit switchToView={this.switchToView} />
                                :
                                <ContactGroupDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                        }
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

export default ContactGroupDetailsFormGeneral;