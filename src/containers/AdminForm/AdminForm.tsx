import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Form, Spinner} from 'react-bootstrap';
import {ApiPage, Page} from '../../types.ts';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';
import {enqueueSnackbar} from 'notistack';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';


interface Props {
  pages: Page[];
  reloadNav: () => void;
}

const initialState = {
  id: '',
  title: '',
  content: '',
};
const AdminForm: React.FC<Props> = ({pages, reloadNav}) => {

  const navigate = useNavigate();
  const [page, setPage] = useState<Page>(initialState);
  const [isEdit, setIsEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fetchEditPage = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiPage | null>(`/pages/${page.id}.json`);
    const pageResponse = response.data;
    if (pageResponse !== null && Object.keys(pageResponse).length !== 0) {
      setPage(prevState => {
        return {...prevState, ...pageResponse};
      });
    }
    setIsLoading(false);
  }, [page.id]);
  useEffect(() => {
    if (isEdit) {
      void fetchEditPage();
    }
  }, [isEdit, fetchEditPage]);
  const changeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = event.target;
    setPage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const changeFormMode = () => {
    setIsEdit(!isEdit);
    setPage(initialState);
  };
  const onFormSubmit = async (event: React.FormEvent) => {
    setIsSending(true);
    event.preventDefault();
    const postData = {
      title: page.title,
      content: page.content
    };
    try {
      if (isEdit) {
        await axiosApi.put(`/pages/${page.id}.json`, postData);
        enqueueSnackbar('Edited', {variant: 'success'});
      } else {
        const pageName = page.id.toLowerCase();
        const address = pageName.split(" ").filter((el) => el.length > 0).join('-');
        const slug = pages.map((el) => {
          return el.id === address;
        });
        if (!slug.includes(true)) {
          await axiosApi.put(`/pages/${address}.json`, postData);
          enqueueSnackbar('Created', {variant: 'success'});
        } else {
          enqueueSnackbar('Created page name not exclusive', {variant: 'error'});
        }
      }
    } catch (e) {
      enqueueSnackbar('Something Wrong', {variant: 'error'});
    } finally {
      setIsSending(false);
    }
    void reloadNav();
    if (isEdit) {
      navigate(`/pages/${page.id}`);
    } else {
      navigate(`/`);
    }
  };
  let submitBtn = (<>Save</>);
  if (isSending) {
    submitBtn = (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </>
    );
  }
  let pageField = (
    <Form.Control
      type="text"
      name="id"
      value={page.id}
      onChange={changeField}
      required
    />
  );
  if (isEdit) {
    pageField = (
      <Form.Select
        name="id"
        value={page.id}
        onChange={changeField}
        required
      >
        <option value="">Select page</option>
        {pages.map(el => {
          return <option value={el.id} key={Math.random() * 1000}>{el.title}</option>;
        })}
      </Form.Select>
    );
  }
  const handleModelChange = (event) => {
    setPage((prev) => ({
      ...prev,
      content: event,
    }));
  };

  return isLoading ?
    <div className="text-center mt-3">
      <Spinner className="mt-3" animation="border" variant="primary"/>
    </div>
    :
    (
      <>
        <Col/>
        <Col sm={10}>
          <div className="text-end mt-4">
            <Button className="mx-3  btn-light btn-outline-primary" onClick={changeFormMode}>
              {!isEdit ? 'Edit mode' : 'Create mode'}
            </Button>
          </div>
          <Form onSubmit={onFormSubmit} className="mt-3">
            <Form.Text muted><h1>{isEdit ? 'Edit page' : 'Create page'}</h1></Form.Text>
            <Form.Group className="mt-3 mb-3"
                        controlId="title"
            >
              <Form.Label>Page</Form.Label>
              {pageField}
            </Form.Group>
            <Form.Group className="mb-3"
                        controlId="title"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={page.title}
                onChange={changeField}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="content"
            >
              <Form.Label>content on froala</Form.Label>
              <FroalaEditorComponent
                tag="textarea"
                onModelChange={handleModelChange}
                model={page.content}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary"
                      type="submit"
                      disabled={isSending}
              >
                {submitBtn}
              </Button>
            </div>
          </Form>
        </Col>
        <Col/>
      </>
    );
};

export default AdminForm;