import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmailModalContext } from '../../context/EmailModalContext';

export default function OpenEmailModalView() {
    const { id } = useParams();
    const { openEmailDetailsModal } = useContext(EmailModalContext);

    useEffect(() => {
        openEmailDetailsModal(id);
    }, [id]);

    return <div></div>;
}
