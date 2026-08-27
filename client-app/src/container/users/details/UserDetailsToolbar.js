import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import moment from 'moment';
import ButtonText from '../../../components/button/ButtonText';

const UserDetailsToolbar = props => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                    {props.blocked === true ? (
                        <ButtonText
                            buttonText={'Deblokkeren'}
                            onClickAction={props.handleUnBlock}
                            type={'submit'}
                            value={'Submit'}
                        />
                    ) : null}
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">
                    {props.fullName} {props.blocked === true ? <span style={{ color: 'red' }}>Geblokkeerd</span> : null}
                </h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        fullName: state.userDetails.fullName,
        blocked: state.userDetails.blocked,
        blockedUntil: state.userDetails.blockedUntil,
        blockedPermanent: state.userDetails.blockedPermanent,
    };
};

export default connect(mapStateToProps, null)(UserDetailsToolbar);
