import React from 'react';
import PropTypes from 'prop-types';
import Panel from "./Panel";
import PanelHeader from "./PanelHeader";

const PanelDeletedItem = props => {
    const {text, restoreAction, restoreText} = props;

    return (
        <Panel>
            <PanelHeader>
                <span className="h5" style={{color: '#e64a4a'}}>{text}  {restoreAction &&
                <a style={{color: '#e64a4a', cursor: 'pointer'}} onClick={restoreAction}><strong>{restoreText}</strong></a>
                }</span>

            </PanelHeader>
        </Panel>
    );
};

PanelDeletedItem.defaultProps = {
    text: 'Dit item is verwijderd',
    restoreText: 'Klik hier om dit item terug te zetten.',
};

PanelDeletedItem.propTypes = {
    text: PropTypes.string,
    restoreAction: PropTypes.func,
    restoreText: PropTypes.string,
};

export default PanelDeletedItem;