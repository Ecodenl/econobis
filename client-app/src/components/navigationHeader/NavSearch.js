import React, { Component } from 'react';
import GeneralSearchAPI from '../../api/general/GeneralSearchAPI';
import GeneralSearchModal from '../../container/general-search/list/GeneralSearchModal';

class NavSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchText: '',
            showSearchResults: false,
        };

        this.searchText = this.searchText.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
        this.changeSearchText = this.changeSearchText.bind(this);
    }

    toggleSearchModal = () => {
        this.setState({
            showSearchResults: !this.state.showSearchResults,
        });
    };

    closeSearchModal = () => {
        this.setState({
            showSearchResults: false,
        });
    };

    changeSearchText(event) {
        this.setState({ searchText: event.target.value });
    }

    searchText(event) {
        event.preventDefault();

        if (this.state.searchText.length > 1) {
            this.closeSearchModal();
            GeneralSearchAPI.search(this.state.searchText.toLowerCase()).then(payload => {
                this.setState({ data: payload });
                this.toggleSearchModal();
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.searchText}>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">
                        <span className="glyphicon glyphicon-search" aria-hidden="true" />
                    </span>
                    <input
                        type="text"
                        onChange={this.changeSearchText}
                        value={this.state.searchText}
                        placeholder="Zoeken..."
                        className="form-control"
                        aria-describedby="basic-addon1"
                    />

                    {this.state.showSearchResults && (
                        <GeneralSearchModal closeModal={this.toggleSearchModal} records={this.state.data} />
                    )}
                </div>
            </form>
        );
    }
}

export default NavSearch;
