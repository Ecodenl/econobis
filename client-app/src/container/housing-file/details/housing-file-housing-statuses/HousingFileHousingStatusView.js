import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import PanelHeader from '../../../../components/panel/PanelHeader';

moment.locale('nl');

const HousingFileHousingStatusView = props => {
    const { id, housingFileHoomLink, status } = props.housingFileHousingStatus;
    const { showEdit } = props;

    return (
        <>
            <div
                className={`row border ${props.highlightLine}`}
                onMouseEnter={() => props.onLineEnter()}
                onMouseLeave={() => props.onLineLeave()}
            >
                <div onClick={props.openEdit}>
                    <div className="col-sm-4">{housingFileHoomLink.label}</div>
                    <div className="col-sm-7">{status.hoomStatusName}</div>
                </div>
                {/*todo WM: edit/delete housingfile housingstatus*/}
                {/*<div className="col-sm-1">*/}
                {/*    {props.showActionButtons && props.permissions.manageHousingFile ? (*/}
                {/*        <a role="button" onClick={props.openEdit}>*/}
                {/*            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}*/}
                {/*        </a>*/}
                {/*    ) : (*/}
                {/*        ''*/}
                {/*    )}*/}
                {/*    {props.showActionButtons && props.permissions.manageHousingFile ? (*/}
                {/*        <a role="button" onClick={props.toggleDelete}>*/}
                {/*            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}*/}
                {/*        </a>*/}
                {/*    ) : (*/}
                {/*        ''*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileHousingStatusView);
