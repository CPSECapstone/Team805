import React, {Component} from 'react';
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
        <Content/>
      </div>
    );
  }
};

export default Homepage;
