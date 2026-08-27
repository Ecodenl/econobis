import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../components/modal/Modal';

import {} from '../../../actions/address-dongle/AddressDonglesFiltersActions';

class AddressDonglesListExtraFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // yesNoOptions: [
            //     {
            //         id: 0,
            //         name: 'Nee',
            //     },
            //     {
            //         id: 1,
            //         name: 'Ja',
            //     },
            // ],
        };

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.toggleShowExtraFilters();
    }

    // onXxxxxChange = e => {
    //     this.props.setFilterAddressDongleXxxxx(e.target.value);
    //
    //     setTimeout(() => {
    //         this.props.onSubmitFilter();
    //     }, 100);
    // };

    render() {
        return (
            <Modal
                title="Extra filters"
                showConfirmAction={false}
                closeModal={this.closeModal}
                buttonCancelText={'Sluiten'}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-md-4">Zoekveld</th>
                            <th className="col-md-3">Waarde</th>
                            <td className="col-md-1" />
                            <th className="col-md-3" />
                            <th className="col-md-1" />
                        </tr>
                    </thead>
                    <tbody>
                        {/*<tr>*/}
                        {/*    <td className="col-md-4">Xxxxx</td>*/}
                        {/*    <td className="col-md-3">*/}
                        {/*        <select*/}
                        {/*            className="form-control input-sm"*/}
                        {/*            value={this.props.filters.xxxxx.data}*/}
                        {/*            onChange={this.onXxxxxChange}*/}
                        {/*        >*/}
                        {/*            <option />*/}
                        {/*            {this.props.xxxxx.map(item => {*/}
                        {/*                return (*/}
                        {/*                    <option key={item.id} value={item.id}>*/}
                        {/*                        {item.name}*/}
                        {/*                    </option>*/}
                        {/*                );*/}
                        {/*            })}*/}
                        {/*        </select>*/}
                        {/*    </td>*/}
                        {/*    <td className="col-md-1" />*/}
                        {/*    <td className="col-md-3" />*/}
                        {/*    <td className="col-md-1" />*/}
                        {/*</tr>*/}
                    </tbody>
                </table>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: state.addressDongles.filters,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            // setFilterAddressDongleXxxxx,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDonglesListExtraFilters);
