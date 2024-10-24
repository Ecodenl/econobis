import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
// import { ThemeSettingsContext } from '../../../context/ThemeSettingsContext';
import { PortalUserContext } from '../../../context/PortalUserContext';
import PortalFreeFieldsPageAPI from '../../../api/portal-free-fields-page/PortalFreeFieldsPageAPI';
import { isEmpty } from 'lodash';

function FreeFieldsPageDetails({ match }) {
    // const { setCurrentThemeSettings } = useContext(ThemeSettingsContext);
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [portalFreeFieldsPage, setPortalFreeFieldsPage] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function callFetchFreeFieldsPage() {
                setLoading(true);
                PortalFreeFieldsPageAPI.fetchFreeFieldsPage(currentSelectedContact.id, match.params.urlPageRef)
                    .then(payload => {
                        setPortalFreeFieldsPage(payload.data.data);
                        // setCurrentThemeSettings(payload.data.data.administration.portalSettingsLayoutAssigned);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    // if (isEmpty(portalFreeFieldsPage)) {
    //     return (
    //         <div className={'content-section'}>
    //             <div className="content-container w-container">
    //                 {isLoading ? (
    //                     <LoadingView />
    //                 ) : (
    //                     <Row>
    //                         <Col>
    //                             <p>Geen gegevens te tonen</p>
    //                         </Col>
    //                     </Row>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="content-container w-container">
                        {/*<Row>*/}
                        {/*    <ButtonGroup aria-label="project-details" className="w-button-group-left">*/}
                        {/*        <Link to={`/inschrijven-projecten`}>*/}
                        {/*            <Button className={'w-button'} size="sm">*/}
                        {/*                Inschrijven projecten*/}
                        {/*            </Button>*/}
                        {/*        </Link>*/}
                        {/*    </ButtonGroup>*/}
                        {/*</Row>*/}

                        <Row>
                            <Col>
                                <h1 className="content-heading">{portalFreeFieldsPage.name}</h1>
                                {!isEmpty(portalFreeFieldsPage.description) ? (
                                    <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                        {portalFreeFieldsPage.description}
                                    </p>
                                ) : null}
                            </Col>
                        </Row>

                        <Row className={'mt-5'}>
                            <Col>
                                {/*<p>*/}
                                {/*{project.documentProjectInfo ? (*/}
                                {/*    <>*/}
                                {/*        {'Meer informatie over dit project kan je hier '}*/}
                                {/*        <a*/}
                                {/*            href="#"*/}
                                {/*            onClick={e =>*/}
                                {/*                downloadFile(*/}
                                {/*                    e,*/}
                                {/*                    project.documentProjectInfo.id,*/}
                                {/*                    project.documentProjectInfo.filename*/}
                                {/*                )*/}
                                {/*            }*/}
                                {/*        >*/}
                                {/*            <FaFileDownload /> downloaden*/}
                                {/*        </a>*/}
                                {/*    </>*/}
                                {/*) : project.linkProjectInfo != null ? (*/}
                                {/*    <>*/}
                                {/*        {'Meer informatie over dit project vind je '}*/}
                                {/*        <a href={`${project.linkProjectInfo}`} target="_blank">*/}
                                {/*            hier*/}
                                {/*        </a>*/}
                                {/*    </>*/}
                                {/*) : null}*/}
                                {/*</p>*/}
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    <Col>*/}
                        {/*        <ButtonGroup className="float-right">*/}
                        {/*            <Link to={`/inschrijven/${project.id}`}>*/}
                        {/*                <Button className={'w-button'} size="sm">*/}
                        {/*                    Ga naar inschrijven*/}
                        {/*                </Button>*/}
                        {/*            </Link>*/}
                        {/*        </ButtonGroup>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </div>
                </>
            )}
        </div>
    );
}

export default FreeFieldsPageDetails;
