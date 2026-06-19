import React, { Component } from 'react';

import Modal from '../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const CampaignDetailsDeleteWrapper = props => {
    const navigate = useNavigate();
    return <CampaignDetailsDelete {...props} navigate={navigate} />;
};

class CampaignDetailsDelete extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { id, numberOfIntakes, closeDeleteItemModal } = this.props;
        const confirmAction = async () => {
            try {
                await CampaignDetailsAPI.deleteCampaign(id);
                this.props.navigate(`/campagnes`);
            } catch (error) {
                if (error.response) {
                    this.props.setError(error.response.status, error.response.data.message);
                } else {
                    console.log(error);
                    alert('Er is iets misgegaan met het verwijderen van de campagne.');
                }
            }
            closeDeleteItemModal();
        };

        return (
            <Modal
                buttonConfirmText="Verwijder"
                buttonClassName={'btn-danger'}
                closeModal={closeDeleteItemModal}
                confirmAction={() => confirmAction()}
                title="Verwijderen"
            >
                {numberOfIntakes > 0 ? (
                    <>
                        <p>
                            Let op, deze campagne heeft nog{' '}
                            <span className={'text-danger'}>
                                <strong>{numberOfIntakes} lopende intakes</strong>
                            </span>{' '}
                            als je deze campagne verwijderd worden deze intakes verwijderd.
                            <br />
                            <span className={'text-danger'}>
                                <strong>DEZE ACTIE KAN NIET ONGEDAAN GEMAAKT WORDEN!</strong>
                            </span>
                            <br /> Weet je zeker dat je deze campagne{' '}
                            <span className={'text-danger'}>
                                <strong>en gerelateerde intakes</strong>
                            </span>{' '}
                            wilt verwijderen?
                        </p>
                    </>
                ) : (
                    <p>Weet u zeker dat u deze campagne wilt verwijderen?</p>
                )}
            </Modal>
        );
    }
}

CampaignDetailsDelete.propTypes = {
    id: PropTypes.any,
    numberOfIntakes: PropTypes.any,
    closeDeleteItemModal: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(CampaignDetailsDeleteWrapper);
