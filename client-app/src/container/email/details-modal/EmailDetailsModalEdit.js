import React, {useEffect, useState} from 'react';

export default function EmailDetailsModalEdit({emailId}) {
    const [email, setEmail] = useState({});

    useEffect(() => {
        console.log('fetch edit');
    }, []);

    return (
        <div>
            Testing edit {emailId}
        </div>
    );
}

