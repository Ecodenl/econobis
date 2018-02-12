import React, {Component} from 'react';
import SvgIcon from 'react-icons-kit';
import {connect} from "react-redux";

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { pencil2 } from 'react-icons-kit/icomoon/pencil2';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';
import {starEmpty} from "react-icons-kit/icomoon/starEmpty";
import { documents } from 'react-icons-kit/ikons/documents';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';

class SidebarMenuSmall extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sidebar-menu-small">
                {/* Dashboard */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_dashboard}/></div>
                {/* Contacten */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_contacts}/></div>
                {/* Intakes */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={home}/></div>
                {/* Groepen beheer */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_aspect_ratio}/></div>
                {/* Email */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_email}/></div>
                {/* Marketing */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={speech_bubbles}/></div>
                {/* Taken */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_business}/></div>
                {/* Agenda */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={calendar}/></div>
                {/* Documenten */}
                {this.props.permissions.viewDocumentTemplate &&
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={documents}/></div>
                }
                {/* Instellingen */}
                <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={cog}/></div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(SidebarMenuSmall);