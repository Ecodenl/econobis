import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const ContactGroupsListToolbar = props => {
    const navigate = useNavigate();

    const newContactGroup = () => {
        navigate('/contact-groep/nieuw');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.contactGroups;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetContactGroupsFilters} />
                    {permissions.manageGroup && (
                        <>
                            <ButtonIcon iconName={'plus'} onClickAction={newContactGroup} />
                            <br /> <br />
                            <ButtonText
                                onClickAction={props.getExcelExportGroupReport}
                                buttonText={`Export groepsrapportage`}
                            />
                            <span>
                                &nbsp;
                                <FaInfoCircle
                                    color={'blue'}
                                    size={'15px'}
                                    data-tip={
                                        'Deze knop exporteert alle groepen waarbij de optie "Meenemen in export groep rapportage" is aangevinkt. Export groep rapportage werkt alleen bij statische groepen.'
                                    }
                                    data-for={'tooltip-export-group-report'}
                                />
                                <ReactTooltip
                                    id={'tooltip-export-group-report'}
                                    effect="float"
                                    place="right"
                                    multiline={true}
                                    aria-haspopup="true"
                                />
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Groepen</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        contactGroups: state.contactGroups.list,
    };
};

export default connect(mapStateToProps)(ContactGroupsListToolbar);
