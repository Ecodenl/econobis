import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSidebarClose, toggleSidebarOpen } from '../../actions/SidebarActions';
import { fetchMeDetails } from '../../actions/MeDetailsActions';
import { fetchSystemData } from '../../actions/SystemDataActions';
import NavHeader from '../../components/navigationHeader/NavHeader';
import Sidebar from '../../components/navigationSidebar/Sidebar';
import LoadingPage from '../../components/loadingPage/LoadingPage';
import Content from './Content';

class Main extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('access_token');

        if(this.props.authenticated && token) {
            props.fetchMeDetails();
        }
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        const token = localStorage.getItem('access_token');

        if(this.props.authenticated && token) {
            this.props.fetchSystemData();
        }
    };

    updateWindowDimensions = () => {
        if(window.innerWidth < 1440){
            this.props.toggleSidebarClose();
        }else{
            this.props.toggleSidebarOpen();
        }
    };

    render() {
        return (
                <div className="container-fluid">
                    {this.props.systemDataLoaded ?
                        <div>
                            <NavHeader />
                            <div className="row">
                                <Sidebar />
                                 <Content children={ this.props.children }/>
                            </div>
                        </div>
                        :
                        <LoadingPage />
                    }
                </div>

        );
    };
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        systemDataLoaded: state.systemData.isLoaded,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchMeDetails, fetchSystemData, toggleSidebarClose, toggleSidebarOpen }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
