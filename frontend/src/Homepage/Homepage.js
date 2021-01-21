import React, {Component} from 'react';
import SideMenu from './SideMenu.js';
import TopMenu from './TopMenu.js';
import Content from './Content.js';

/**
 * Homepage component.
 */
class Homepage extends Component {
  /**
   * Renders homepage
   * @return {div} - Returns the homepage components
   */
  render() {
    return (
      <div>
        <TopMenu/>
        <SideMenu/>
        <Content/>
      </div>
    );
  }
};

export default Homepage;
