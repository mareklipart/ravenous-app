import React from 'react';
import './SearchBar.css';

const sortByOption = {
    'Best Match':'best_match',
    'Highest Rated':'rating',
    'Most Reviewed':'review_count'
}

export class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this)
    }
    renderSortByOptions () { 
        const values = Object.keys(sortByOption).map(k => {
                    return <li key={sortByOption[k]} className={this.getSortByClass(sortByOption[k])} onClick={this.getSortByClass(sortByOption[k])==='active'?null:this.handleSortByChange.bind(this, sortByOption[k], sortByOption[k])}>{k}</li>
                }
            );
        return values;
    }
    getSortByClass (sortByOption) {
        if (this.state.sortBy===sortByOption) {
            return 'active'
        } else {
            return ''
        }
    }
    handleSortByChange (sortByOption, j) {
        this.setState ({sortBy: sortByOption});
        this.props.searchYelp(this.state.term, this.state.location, j);
    }
    handleTermChange(event) {
        this.setState({term: event.target.value})
    }
    handleLocationChange(event) {
        this.setState({location: event.target.value})
    }
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);  
        event.preventDefault()
    }
    render() {
        return (
            <div className="SearchBar">
  <div className="SearchBar-sort-options">
    <ul>
        {this.renderSortByOptions()}
    </ul>
  </div>
  <div className="SearchBar-fields">
    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
    <input placeholder="Where?" onChange={this.handleLocationChange}/>
  </div>
  <div className="SearchBar-submit" onClick={this.handleSearch}>
    <a>Let's Go</a>
  </div>
</div>
        )
    }
}

