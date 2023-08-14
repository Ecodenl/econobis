import React, {useState} from 'react';
import {Link} from "react-router";

/**
 * Klein component om een inklapbare lijst met mailadressen mee weer te geven.
 *
 * Verwacht emailAddresses array parameter met daarin objecten met een name en email key.
 */
export default function EmailAddressList({emailAddresses}) {
    const defaultCcDisplayLimit = 1;
    const [emailDisplayLimit, setDisplayLimit] = useState(defaultCcDisplayLimit);

    const displayEmail = (email) => {
        if (email.email && email.name) {
            return (<>{email.name} (<Link className="link-underline" to={'mailto: ' + email.email}>{email.email}</Link>)</>);
        }

        if (email.email) {
            return (<Link className="link-underline" to={'mailto: ' + email.email}>{email.email}</Link>);
        }

        return email.name;
    }

    if (!emailAddresses) {
        return null;
    }

    return (
        <>
            {
                [...emailAddresses].splice(0, emailDisplayLimit).map((email, index) => {
                    return (
                        <span key={email.email}>
                                            {
                                                index > 0 && (
                                                    <span>, </span>
                                                )
                                            }
                            {displayEmail(email)}
                                        </span>
                    )
                })
            }
            {
                emailAddresses.length > emailDisplayLimit && (
                    <>
                        <br/>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setDisplayLimit(emailAddresses.length)
                        }}>
                            {emailAddresses.length - emailDisplayLimit} meer...
                        </a>
                    </>
                )
            }
            {
                emailDisplayLimit > defaultCcDisplayLimit && (
                    <>
                        <br/>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setDisplayLimit(defaultCcDisplayLimit)
                        }}>
                            verbergen
                        </a>
                    </>
                )
            }
        </>
    );
}

