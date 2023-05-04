import React from 'react';
import SvgIcon from 'react-icons-kit';
import { connect } from 'react-redux';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';
import { documents } from 'react-icons-kit/ikons/documents';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';
import { drawer } from 'react-icons-kit/icomoon/drawer';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { road } from 'react-icons-kit/icomoon/road';
import { forward } from 'react-icons-kit/icomoon/forward';
import { stopwatch } from 'react-icons-kit/icomoon/stopwatch';

const SidebarMenuSmall = ({ permissions, administrations }) => (
    <div className="sidebar-menu-small">
        {/* Dashboard */}
        <div className="sidebar-menu-small-item">
            <SvgIcon size={20} icon={ic_dashboard} />
        </div>
        {/* Contacten */}
        {permissions.menuContacts && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={ic_contacts} />
            </div>
        )}
        {/* Projects */}
        {permissions.menuProjects && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={drawer} />
            </div>
        )}
        {/* Intakes */}
        {permissions.menuEnergySaving && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={home} />
            </div>
        )}
        {/* Groepen beheer */}
        {permissions.menuContactGroups && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={ic_aspect_ratio} />
            </div>
        )}
        {/* Email */}
        {permissions.menuEmail && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={ic_email} />
            </div>
        )}
        {/* Taken */}
        {permissions.menuTasks && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={ic_business} />
            </div>
        )}
        {/* Agenda */}
        {(permissions.menuAgenda || permissions.manageCoachPlanning) && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={calendar} />
            </div>
        )}
        {/* Processen */}
        {permissions.menuProcesses && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={stopwatch} />
            </div>
        )}
        {/* Documenten */}
        {permissions.menuDocuments && permissions.viewDocument && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={documents} />
            </div>
        )}
        {/* Administraties */}
        {permissions.menuFinancial && permissions.manageFinancial && administrations.length > 0 && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={ic_business_center} />
            </div>
        )}
        {/* Workflow */}
        {permissions.menuWorkflow && permissions.manageFinancial && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={forward} />
            </div>
        )}
        {/* Instellingen */}
        {permissions.menuGeneralSettings && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={cog} />
            </div>
        )}
        {/* Portal instellingen */}
        {permissions.menuPortalSettings && permissions.managePortalSettings && (
            <div className="sidebar-menu-small-item">
                <SvgIcon size={20} icon={road} />
            </div>
        )}
    </div>
);

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(SidebarMenuSmall);
