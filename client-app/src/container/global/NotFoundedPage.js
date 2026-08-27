import React from 'react';
import { Link } from 'react-router-dom';

import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

const NotFoundedPage = () => (
    <Panel>
        <PanelBody>
            <h1>
                <strong>404</strong>
            </h1>
            <p>
                De gevraagde pagina is niet gevonden. Ga <Link to={'/'}>terug</Link> naar het dashboard of probeer een
                andere link.
            </p>
        </PanelBody>
    </Panel>
);

export default NotFoundedPage;
