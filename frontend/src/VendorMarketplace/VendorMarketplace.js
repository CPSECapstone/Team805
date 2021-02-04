import React, {Component} from 'react';
import TopMenu from '../Homepage/TopMenu.js';
import SearchBar from './SearchBar.js';
import Content from './Content.js';

/**
 * VendorMarketplace component.
 */
class Homepage extends Component {
  /**
   * Renders vendor marketplace
   * @return {div} - Returns the marketplace components
   */
  render() {
    return (
      <div>
        <TopMenu/>
        <SearchBar/>
        <Content/>
      </div>
    );
  }
};

export default Homepage;
