import React from 'react';
import PropTypes from 'prop-types';
import Panel from "./Panel";
import PanelHeader from "./PanelHeader";

const PanelDeletedItem = props => {
    const {text} = props;

    return (
        <Panel>
            <PanelHeader>
                <span className="h5" style={{color: '#e64a4a'}}>{text}</span>
            </PanelHeader>
        </Panel>
    );
};

PanelDeletedItem.defaultProps = {
    text: 'Dit item is verwijderd',
};

PanelDeletedItem.propTypes = {
    text: PropTypes.string,
};

export default PanelDeletedItem;