import React, { Component} from 'react';

import ContactDetailsFormEnergyEdit from './ContactDetailsFormEnergyEdit';
import ContactDetailsFormEnergyView from './ContactDetailsFormEnergyView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormEnergy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
            showEditIcon: false,
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
            showEditIcon: false,
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
            showEditIcon: true,
        });
    };

    onDivLeave() {
        this.setState({
            activeDiv: '',
            showEditIcon: false,
        });
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                <PanelHeader>
                    <span className="h5 text-bold">Energie</span>
                    <a role="button" className="pull-right"><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-11">
                        {
                            this.state.showEdit ?
                                <ContactDetailsFormEnergyEdit switchToView={this.switchToView} />
                                :
                                <ContactDetailsFormEnergyView switchToEdit={this.switchToEdit}/>
                        }
                    </div>
                    <div className="col-md-1">
                        {
                            this.state.showEditIcon ? <span className="glyphicon glyphicon-edit mybtn-grey pull-right"/> : <span/>
                        }
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

export default ContactDetailsFormEnergy;