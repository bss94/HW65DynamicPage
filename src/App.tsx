import {Container, Row} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import DynamicPage from './containers/DynamicPage/DynamicPage.tsx';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <Container>
      <Row>
        <Routes>
          <Route path="/" element={<DynamicPage/>}>
          </Route>
          <Route path="/pages/:pageName" element={<DynamicPage/>}/>
          <Route path="/pages/admin" element={<div/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </Row>
    </Container>
  </>
);

export default App
