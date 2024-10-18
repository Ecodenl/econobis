import React, { useEffect, useState } from 'react';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import { browserHistory, hashHistory } from 'react-router';
import PortalFreeFieldsPagesDetailsFormGeneral from './general/PortalFreeFieldsPagesDetailsFormGeneral';
import PortalFreeFieldsPagesDeleteItem from '../list/PortalFreeFieldsPagesDeleteItem';
import { isEmpty } from 'lodash';

function PortalFreeFieldsPagesDetailsApp(props) {
    const [portalFreeFieldsPage, setPortalFreeFieldsPage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showDeleteItem, setShowDeleteItem] = useState(false);

    function showDeleteItemModal() {
        setShowDeleteItem(true);
    }

    function closeDeleteItemModal() {
        setShowDeleteItem(false);
    }

    useEffect(() => {
        fetchPortalFreeFieldsPage();
    }, []);

    function deletePortalFreeFieldsPage(portalFreeFieldsPage) {
        PortalFreeFieldsAPI.deletePortalFreeFieldsPage(portalFreeFieldsPage)
            .then(() => {
                hashHistory.push(`/vrije-velden-portaal-pagina`);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan bij verwijderen. Probeer het opnieuw.');
            });
    }

    function fetchPortalFreeFieldsPage() {
        setIsLoading(true);
        PortalFreeFieldsAPI.fetchPortalFreeFieldsPageDetails(props.params.id)
            .then(data => {
                setPortalFreeFieldsPage(data);
                setIsLoading(false);
                setHasError(false);
            })
            .catch(() => {
                alert('Er is iets misgegaan met ophalen van het vrije veld.');
                setIsLoading(false);
                setHasError(true);
            });
    }

    let loadingText = '';
    if (hasError) {
        loadingText = 'Fout bij het ophalen van het vrije velden portaal pagina.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(portalFreeFieldsPage)) {
        loadingText = "Geen vrije velden portaal pagina's gevonden!";
    }

    return isLoading || hasError ? (
        <div>{loadingText}</div>
    ) : (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                                        <ButtonIcon iconName={'trash'} onClickAction={showDeleteItemModal} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">
                                        Vrije velden portaal pagina: {portalFreeFieldsPage.name}
                                    </h4>
                                </div>
                                <div className="col-md-4" />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12">
                    <PortalFreeFieldsPagesDetailsFormGeneral
                        portalFreeFieldsPage={portalFreeFieldsPage}
                        fetchPortalFreeFieldsPage={fetchPortalFreeFieldsPage}
                    />
                </div>

                <div className="col-md-12 margin-10-top"></div>
            </div>
            {showDeleteItem && (
                <PortalFreeFieldsPagesDeleteItem
                    closeDeleteItemModal={closeDeleteItemModal}
                    deletePortalFreeFieldsPage={deletePortalFreeFieldsPage}
                    description={portalFreeFieldsPage.name}
                    id={portalFreeFieldsPage.id}
                />
            )}
        </div>
    );
}

export default PortalFreeFieldsPagesDetailsApp;
