import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const DocumentsListToolbar = props => {
    const navigate = useNavigate();

    const newDocument = type => {
        navigate(`document/nieuw/${type}/document`);
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.documents;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                    <ButtonIcon iconName={'refresh'} onClickAction={props.resetDocumentsFilters} />
                    {/* Voorlopig geen nieuwe documenten (maken / uploaden) vanuit hier,Zie verderop uitleg via {i} knop */}
                    {/*    {permissions.createDocument && (*/}
                    {/*        <div className="nav navbar-nav btn-group" role="group">*/}
                    {/*            <button className="btn btn-success btn-sm" data-toggle="dropdown">*/}
                    {/*                <Icon size={14} icon={plus} />*/}
                    {/*            </button>*/}
                    {/*            <ul className="dropdown-menu">*/}
                    {/*                <li>*/}
                    {/*                    <a className="btn" onClick={() => newDocument('internal')}>*/}
                    {/*                        Maak document*/}
                    {/*                    </a>*/}
                    {/*                </li>*/}
                    {/*                <li>*/}
                    {/*                    <a className="btn" onClick={() => newDocument('upload')}>*/}
                    {/*                        Upload document*/}
                    {/*                    </a>*/}
                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">
                    <span>Documenten</span>
                    {permissions.createDocument && (
                        <span>
                            &nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={`Deze pagina is voor overzichten van documenten.<br/>
Het uploaden van documenten kan alleen vanaf de pagina waarvoor je wilt uploaden.<br/>
Let op: Deze pagina's zijn via individuele contacten allemaal ook bereikbaar vanaf: Menu > Contacten > Open contact > Groene knoppen rechts op de pagina scherm<br/>
Voor Contacten: Menu > Contacten > Open contact<br/>
Voor Groepen : Menu > Groepen beheer > Open groep<br/>
Voor Administratie: Menu > Instellingen > Administraties<br/>
Voor Campagne: Menu > Marketing > Open campagne<br/>
Voor Kans : Menu > Energie besparing > Kansen > Open kans<br/>
Voor Offerteverzoek : Menu > Energie besparing > Kansacties > Open verzoek<br/>
Voor Project : Menu > Projecten > Open project<br/>
Voor Deelnemer Project: Menu > Projecten > Open project > Open deelnemer<br/>
Voor Order: Menu > Financieel > Kies administratie > Open order<br/>
Voor Intake: Menu > Energie besparing > Intakes > Open intake<br/>
Voor Taak: Menu > Taken > Open taak<br/>
Voor Notities: Menu > Taken > Notities (pijltje achter taken in menu) > Open notitie<br/>
Voor Woningdossier: Menu > Energiebesparing > Woningdossiers > Open woningdossier<br/>
Voor Maatregel: Menu > Energiebesparing > Maatregelen > Open maatregel<br/>`}
                                data-for={'tooltip-new-document'}
                            />
                            <ReactTooltip
                                id={'tooltip-new-document'}
                                effect="float"
                                place="bottom"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </span>
                    )}
                </h3>
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
        documents: state.documents.list,
    };
};

export default connect(mapStateToProps)(DocumentsListToolbar);
