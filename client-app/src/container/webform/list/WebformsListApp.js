import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWebforms, clearWebforms } from '../../../actions/webform/WebformsActions';
import WebformList from './WebformsList';
import WebformsListToolbar from './WebformsListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class WebformsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchWebforms();
    }

    componentWillUnmount() {
        this.props.clearWebforms();
    }

    refreshWebformsData = () => {
        this.props.clearWebforms();
        this.props.fetchWebforms();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <WebformsListToolbar refreshWebformsData={() => this.refreshWebformsData()} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <WebformList webforms={this.props.webforms} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        webforms: state.webforms,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchWebforms: () => {
        dispatch(fetchWebforms());
    },
    clearWebforms: () => {
        dispatch(clearWebforms());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WebformsListApp);
