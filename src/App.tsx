import {Container, Row} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import DynamicPage from './containers/DynamicPage/DynamicPage.tsx';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from './axiosApi.ts';
import {ApiPages, Page} from './types.ts';
import AdminForm from './containers/AdminForm/AdminForm.tsx';

const App = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isFetching,setIsFetching] = useState(false)

  const fetchPages = useCallback(async () => {
    setIsFetching(true);
    const response = await axiosApi.get<ApiPages | null>('/pages.json');
    const pagesResponse = response.data;
    if (pagesResponse !== null && Object.keys(pagesResponse).length !== 0) {
      const links: Page[] = Object.keys(pagesResponse).map((id: string) => {
        return {
          ...pagesResponse[id],
          id,
        };
      });
      setPages(links);
    } else {
      setPages([]);
    }
    setIsFetching(false);
  }, []);

  useEffect(()=>{
    void fetchPages();
  },[fetchPages])

  return(
    <>
      <header>
        <Toolbar pages={pages} />
      </header>
      <Container>
        <Row>
          <Routes>
            <Route path="/" element={<DynamicPage/>}>
            </Route>
            <Route path="/pages/:pageName" element={<DynamicPage/>}/>
            <Route path="/pages/admin" element={<AdminForm pages={pages}/>}/>
            <Route path="*" element={<h1>not found</h1>}/>
          </Routes>
        </Row>
      </Container>
    </>
  );
}
export default App
