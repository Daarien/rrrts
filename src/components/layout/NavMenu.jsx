import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { FaIcon, ImgIcon } from '../custom/Elements';
import DotaLogo from '../../assets/img/dota-logo-mono.png';
import './NavMenu.css';
import { link } from 'fs';

const links = [
  {name: 'Home', icon: 'home', route: '/'},
  {name: 'Counter', icon: 'calculator', route: '/counter'},
  {name: 'Heroes', icon: 'DotaLogo', route: '/heroes'},
]

function NavMenu({match, location}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="page-header">
        <Navbar.Brand>
          <Link to='/'>WebCore</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {links.map(link => {
              return (
                <Link to={link.route} key={link.name}>
                  <Nav.Link as={'span'} active={location.pathname === link.route}>
                    {link.icon === 'DotaLogo'
                      ? <ImgIcon src={DotaLogo} />
                      : <FaIcon icon={link.icon} />
                    } {link.name}
                  </Nav.Link>
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavMenu);