import React, {useContext, useEffect} from 'react';
import {EmailModalContext} from "../../context/EmailModalContext";

export default function EmailSplitView({router}) {
    const {openEmailDetailsModal} = useContext(EmailModalContext);

    useEffect(() => {
        openEmailDetailsModal(router.params.id);
    }, [router.params.id]);

    return (
        <div>
        </div>
    );
}
