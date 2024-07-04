import React from 'react';
import {Page} from '../../types.ts';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

interface Props {
  pages: Page[];
}

const Toolbar: React.FC<Props> = ({pages}) => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Static pages
        </NavLink>
        <Nav className="ms-auto">
          {pages.map(el => {
            if (el.title !== 'Main') {
              return <NavLink className="nav-link" to={`/pages/${el.id}`} key={el.id}>{el.title}</NavLink>;
            }
          })}
          <NavLink className="nav-link" to={`/pages/admin`}>Admin</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Toolbar;