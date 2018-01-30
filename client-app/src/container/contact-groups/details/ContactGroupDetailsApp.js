import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchContactGroupDetails } from '../../../actions/contact-group/ContactGroupDetailsActions';
import ContactGroupDetailsToolbar from './ContactGroupDetailsToolbar';
import ContactGroupDetailsForm from './ContactGroupDetailsForm';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";
import ContactGroupsDetailsHarmonica from "./ContactGroupsDetailsHarmonica";

class ContactGroupDetailsApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchContactGroupDetails(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        < ContactGroupDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <ContactGroupDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        <ContactGroupsDetailsHarmonica id={this.props.params.id}/>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactGroupDetails: (id) => {
        dispatch(fetchContactGroupDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupDetailsApp);
