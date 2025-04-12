import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { createLink, getLinks } from '../store/slices/linksSlice';

export const useLinks = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.links);

  const fetchLinks = (page = 1, search = '') => {
    dispatch(getLinks({ page, search }));
  };

  const shortenLink = (linkData) => {
    return dispatch(createLink(linkData)).unwrap();
  };

  return {
    ...state,
    fetchLinks,
    shortenLink
  };
};