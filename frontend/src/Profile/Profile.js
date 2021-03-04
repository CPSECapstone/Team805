import React, {Component} from 'react';
import TopMenu from '../Homepage/TopMenu';
import ProfileContents from './ProfileContents';

/**
   * Renders profile page
   * @return {*}
   */
class Profile extends Component {
  /**
   * Renders profile
   * @return {div} - Returns the profile components
   */
  render() {
    return (
      <div>
        <TopMenu/>
        <ProfileContents/>
      </div>
    );
  }
};

export default Profile;
