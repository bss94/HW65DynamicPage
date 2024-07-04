import React, {useCallback, useEffect, useState} from 'react';
import {ApiPages, Page} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  const [navLinks, setNavLinks] = useState<Page[]>([]);
  const [isFetching,setIsFetching] = useState(false)

  const fetchLinks = useCallback(async () => {
    setIsFetching(true);
    const response = await axiosApi.get<ApiPages | null>('/pages.json');
    const linkResponse = response.data;
    if (linkResponse !== null && Object.keys(linkResponse).length !== 0) {
      const links: Page[] = Object.keys(linkResponse).map((id: string) => {
        return {
          ...linkResponse[id],
          id,
        };
      });
      console.log(links);
      setNavLinks(links);
    } else {
      setNavLinks([]);
    }
    setIsFetching(false);
  }, []);

  useEffect(()=>{
    void fetchLinks();
  },[fetchLinks])


  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Static pages
        </NavLink>
        <Nav className="ms-auto">
          <NavLink className="nav-link" to={`/`}>Home</NavLink>
          {navLinks.map(el=>{
            if(el.title!== 'Main'){
              return  <NavLink className="nav-link" to={`/pages/${el.id}`} key={el.id}>{el.title}</NavLink>
            }
          })}
          <NavLink className="nav-link" to={`/pages/admin`}>Admin</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Toolbar;