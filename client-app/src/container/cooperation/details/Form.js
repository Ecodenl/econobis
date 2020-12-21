import React, { useState } from 'react';

function CooperationDetailsForm() {
    const [activeDiv, setActiveDiv] = useState('');

    function toggleDivEnter() {
        if (activeDiv) {
            setActiveDiv('');
        } else {
            setActiveDiv('panel-grey');
        }
    }

    return (
        <div className={activeDiv} onMouseEnter={toggleDivEnter} onMouseLeave={toggleDivEnter}>
            Test
        </div>
    );
}

export default CooperationDetailsForm;
