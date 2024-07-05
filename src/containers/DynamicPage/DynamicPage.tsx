import React, {useCallback, useEffect, useState} from 'react';
import {ApiPage, Page} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {useParams} from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

const DynamicPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const {pageName: currentPage} = useParams();

  const fetchPage = useCallback(async () => {
    setIsFetching(true);
    if (currentPage !== undefined) {
      const response = await axiosApi.get<ApiPage | null>(`/pages/${currentPage}.json`);
      const pageResponse = response.data;
      if (pageResponse !== null) {
        setPage(pageResponse);
      } else {
        setPage(null);
      }
    } else {
      const response = await axiosApi.get<ApiPage | null>(`/pages/main.json`);
      const pageResponse = response.data;
      if (pageResponse !== null) {
        setPage(pageResponse);
      } else {
        setPage(null);
      }
    }
    setIsFetching(false);
  }, [currentPage]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  return isFetching ?
    <div className="text-center mt-3">
      <Spinner className="mt-3" animation="border" variant="primary"/>
    </div>
    :
    (
      <div>{
        page ? <>
            <h1 className="p-2 mx-5 mt-3 text-capitalize">{page.title}</h1>
            <div className="p-3" dangerouslySetInnerHTML={
              {__html: page.content}
            }/>
          </>
          :
          <>
            <h1>Error data not found</h1>
          </>
      }
      </div>
    );
};

export default DynamicPage;