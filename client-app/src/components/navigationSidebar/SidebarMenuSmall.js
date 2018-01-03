import React from 'react';
import SvgIcon from 'react-icons-kit';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_email } from 'react-icons-kit/md/ic_email';
import { cog } from 'react-icons-kit/icomoon/cog';
import { drawer } from 'react-icons-kit/icomoon/drawer';
import { pencil2 } from 'react-icons-kit/icomoon/pencil2';
import { speech_bubbles } from 'react-icons-kit/ikons/speech_bubbles';
import {starEmpty} from "react-icons-kit/icomoon/starEmpty";

const SidebarMenuSmall = props => {
    return (
        <div className="sidebar-menu-small">
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_aspect_ratio}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_contacts}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={pencil2}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={drawer}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_business}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_aspect_ratio}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_email}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={speech_bubbles}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_business}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={starEmpty}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_aspect_ratio}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={ic_business}/></div>
            <div className="sidebar-menu-small-item"><SvgIcon size={20} icon={cog}/></div>
        </div>
    )
};

export default SidebarMenuSmall;