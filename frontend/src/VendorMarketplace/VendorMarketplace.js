import React, {Component} from 'react';
import TopMenu from '../Homepage/TopMenu.js';
import SearchBar from './SearchBar.js';
import Content from './Content.js';

/**
 * VendorMarketplace component.
 */
class Homepage extends Component {
  /**
   * @param {*} props - not used
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  /**
   * Renders vendor marketplace
   * @return {div} - Returns the marketplace components
   */
  render() {
    return (
      <div>
        <TopMenu/>
        <SearchBar onChange={(value) => this.setState({search: value})}/>
        <Content searchInput={this.state.search}/>
      </div>
    );
  }
};

export default Homepage;
