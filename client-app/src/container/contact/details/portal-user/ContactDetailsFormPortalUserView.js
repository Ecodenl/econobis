import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormPortalUserView = props => {
    const { email } = props.portalUser;
    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div onClick={props.switchToEdit}className="col-sm-11">
                    <ViewText label="Inlog emailadres" value={email} />
                </div>
                <div className="col-sm-1">
                    {props.showActionButtons ? (
                        <a role="button" onClick={props.switchToEdit}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {props.showActionButtons ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>

        </div>

    );
};

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPortalUserView);
