import React, { Component } from 'react';

class NavSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };

        this.searchText = this.searchText.bind(this);
    }

    searchText(event) {
        this.setState({searchText: event.target.value.toLowerCase()});

        let searchText = event.target.value.toLowerCase();

        console.log(searchText);
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
                <input type='text' value={this.state.searchText} onChange={ this.searchText } placeholder="Zoeken ..." className="form-control" aria-describedby="basic-addon1" />
            </div>
        )
    }
}

export default NavSearch;