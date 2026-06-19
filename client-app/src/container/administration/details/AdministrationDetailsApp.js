import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchAdministrationDetails } from '../../../actions/administration/AdministrationDetailsActions';
import AdministrationDetailsToolbar from './AdministrationDetailsToolbar';
import AdministrationDetailsForm from './AdministrationDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import AdministrationDetailsHarmonica from './AdministrationDetailsHarmonica';

const AdministrationDetailsAppWrapper = props => {
    const params = useParams();
    return <AdministrationDetailsApp {...props} params={params} />;
};

class AdministrationDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAdministrationDetails(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            this.props.fetchAdministrationDetails(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <AdministrationDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <AdministrationDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <AdministrationDetailsHarmonica administration={this.props.administrationDetails} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAdministrationDetails: id => {
        dispatch(fetchAdministrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationDetailsAppWrapper);
