import React from 'react';


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkAnalytics } from '../store/slices/linksSlice';

export const useAnalytics = (linkId) => {
  const dispatch = useDispatch();
  const { analytics, status } = useSelector((state) => state.links);

  useEffect(() => {
    dispatch(getLinkAnalytics(linkId));
  }, [dispatch, linkId]);

  return {
    analytics,
    isLoading: status === 'loading',
    error: status === 'failed'
  };
};