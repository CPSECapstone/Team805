import React from 'react';
import {Link} from 'react-router-dom';

/**
 *
 * @return {*}
 */
const Home = () => {
  return (
    <div>
      <h2>CloudHaven home</h2>
      <ul>
        <li>
          <Link to='/login'>Login (Restricted)</Link>
        </li>
        <li>
          <Link to='/sampleflow'>Sample Flow (Private)</Link>
        </li>
        <li>
          <Link to='/public'>Public Page (Public)</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
