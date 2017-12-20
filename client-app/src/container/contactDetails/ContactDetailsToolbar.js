import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteContact } from '../../actions/ContactDetailsActions';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import ButtonIcon from '../../components/button/ButtonIcon';
import ContactDetailsDelete from './ContactDetailsDelete';

class ContactDetailsToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        const { type = {} } = this.props;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-4">
                                <div className="btn-group margin-small" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                    {
                                        type.id === 'organisation' && this.props.permissions.deleteOrganisation &&
                                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                    {
                                        type.id === 'person' && this.props.permissions.deletePerson &&
                                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4"><h4 className="text-center text-success margin-small"><strong>{this.props.fullName || 'Nieuw'} ({type.name})</strong></h4></div>
                            <div className="col-md-4" />
                        </PanelBody>
                    </Panel>
                </div>

                {
                    this.state.showDelete &&
                    <ContactDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        fullName={this.props.fullName}
                        id={this.props.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        fullName: state.contactDetails.fullName,
        id: state.contactDetails.id,
        type: state.contactDetails.type,
        permissions: state.meDetails.permissions,
    }
};

const mapDispatchToProps = dispatch => ({
    deleteContact: (id) => {
        dispatch(deleteContact(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsToolbar);
