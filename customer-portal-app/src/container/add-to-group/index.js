import React, { useContext, useEffect, useState } from 'react';
import { PortalUserContext } from '../../context/PortalUserContext';
import GroupAPI from '../../api/group/GroupAPI';
import Modal from '../../components/modal/Modal';

function AddContactToGroup({ match, history }) {
    const { currentSelectedContact } = useContext(PortalUserContext);

    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({ ok: false, message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            if (!currentSelectedContact?.id) return;

            setLoading(true);
            try {
                await GroupAPI.addContactToGroup(match.params.id, currentSelectedContact.id);
                if (!cancelled) {
                    setResult({ ok: true, message: 'Je bent succesvol aan de groep toegevoegd.' });
                }
            } catch (e) {
                // Pak een nette foutmelding indien aanwezig
                const apiMsg = e?.response?.data?.message || e?.message || 'Toevoegen aan de groep is mislukt.';
                if (!cancelled) {
                    setResult({ ok: false, message: apiMsg });
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                    setShowResult(true);
                }
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [currentSelectedContact?.id, match.params.id]);

    const handleClose = () => {
        history.push('/dashboard');
    };

    return (
        <>
            {showResult ? (
                <Modal
                    title="Toevoegen aan groep"
                    showConfirmAction={false}
                    buttonCancelText="OK"
                    closeModal={handleClose} // functie doorgeven, niet direct aanroepen
                >
                    {loading ? (
                        <p>Bezig met verwerken…</p>
                    ) : result.ok ? (
                        <div>
                            <p>
                                <strong>Succes!</strong>
                            </p>
                            <p>{result.message}</p>
                        </div>
                    ) : (
                        <div>
                            <p>
                                <strong>Er ging iets mis.</strong>
                            </p>
                            <p>{result.message}</p>
                        </div>
                    )}
                </Modal>
            ) : null}
        </>
    );
}

export default AddContactToGroup;
