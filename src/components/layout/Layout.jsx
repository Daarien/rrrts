import React from 'react';
import NavMenu from './NavMenu';

export default class Layout extends React.Component {
  render() {
    return <div className='root-container'>
      <NavMenu />
      {this.props.children}
    </div>;
  }
}