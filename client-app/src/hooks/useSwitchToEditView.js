import React, { useState } from 'react';

function useSwitchToEditView() {
    const [state, setState] = useState({
        showEdit: false,
        activeDiv: '',
    });

    function switchToEdit() {
        setState({
            ...state,
            showEdit: true,
        });
    }

    function switchToView() {
        setState({
            showEdit: false,
            activeDiv: '',
        });
    }

    function onDivEnter() {
        setState({
            ...state,
            activeDiv: 'panel-grey',
        });
    }

    function onDivLeave() {
        if (!state.showEdit) {
            setState({
                ...state,
                activeDiv: '',
            });
        }
    }

    return { state, switchToEdit, switchToView, onDivEnter, onDivLeave };
}

export default useSwitchToEditView;
