import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPostalCodeLinks, clearPostalCodeLinks } from '../../../actions/postal-code-link/PostalCodeLinkActions';
import PostalCodeLinkList from './PostalCodeLinkList';
import PostalCodeLinkListToolbar from './PostalCodeLinkListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class PostalCodeLinkListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };

    }

    componentDidMount() {
        this.props.fetchPostalCodeLinks();
    };

    componentWillUnmount() {
        this.props.clearPostalCodeLinks();
    };

    refreshPostalCodeLinksData = () => {
        this.props.clearPostalCodeLinks();
        this.props.fetchPostalCodeLinks();
    };

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <PostalCodeLinkListToolbar
                            refreshPostalCodeLinksData={() => this.refreshPostalCodeLinksData()}
                            toggleShowNew={() => this.toggleShowNew()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PostalCodeLinkList
                            postalCodeLinks={this.props.postalCodeLinks}
                            toggleShowNew={this.toggleShowNew}
                            showNew={this.state.showNew}
                            refreshPostalCodeLinksData={this.refreshPostalCodeLinksData}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postalCodeLinks: state.postalCodeLinks,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPostalCodeLinks: () => {
        dispatch(fetchPostalCodeLinks());
    },
    clearPostalCodeLinks: () => {
        dispatch(clearPostalCodeLinks());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostalCodeLinkListApp);