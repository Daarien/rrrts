import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaIcon, ImgIcon } from '../custom/Elements';
import DotaLogo from '../../assets/img/dota-logo-mono.png';
import './NavMenu.css';

export default class NavMenu extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="page-header">
          <Navbar.Brand>
            <Link to={'/'}>WebCore</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <LinkContainer to={'/'} exact>
                <Nav.Link>
                  <FaIcon icon='home' /> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/counter'}>
                <Nav.Link>
                  <FaIcon icon='calculator' /> Counter
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/heroes'}>
                <Nav.Link>
                  <ImgIcon item={DotaLogo} /> Heroes
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
