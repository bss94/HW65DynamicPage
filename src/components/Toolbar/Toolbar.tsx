import React from 'react';
import {Page} from '../../types.ts';
import {Container, Nav, Navbar, Spinner} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

interface Props {
  pages: Page[];
  isFetching:boolean
}

const Toolbar: React.FC<Props> = ({pages,isFetching}) => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Static pages
        </NavLink>
        <Nav className="ms-auto">
          {isFetching
            ?
            <Spinner  animation="border" variant="light"/>
            :
            pages.map(el => {
                return <NavLink className="nav-link" to={`/pages/${el.id}`} key={el.id}>{el.title}</NavLink>;
            })
          }

          <NavLink className="nav-link" to={`/pages/admin`}>Admin</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Toolbar;