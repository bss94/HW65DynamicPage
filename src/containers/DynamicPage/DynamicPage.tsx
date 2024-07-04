import React, {useCallback, useEffect, useState} from 'react';
import {ApiPage, Page} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {useParams} from 'react-router-dom';

const DynamicPage = () => {
  const [page, setPage] = useState<Page|null>(null);
  const [isFetching,setIsFetching] = useState(false);
  const {pageName:currentPage}=useParams();

  const fetchPage = useCallback(async () => {
    setIsFetching(true);
    if(currentPage!==undefined){
      const response = await axiosApi.get<ApiPage | null>(`/pages/${currentPage}.json`);
      const pageResponse = response.data;
      if (pageResponse !== null) {
        setPage(pageResponse);
      } else {
        setPage(null);
      }
    }else {
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

  useEffect(()=>{
    void fetchPage();
  },[fetchPage])

  return (
    <div>
      <h1>{page?.title}</h1>
      <p>{page?.content}</p>
    </div>
  );
};

export default DynamicPage;