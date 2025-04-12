// client/src/components/layout/Alert.jsx
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Alert = () => {
  const { error } = useSelector((state) => state.auth);
  const linksError = useSelector((state) => state.links.error);

  useEffect(() => {
    const message = error || linksError;
    if (message) {
      toast.error(message);
    }
  }, [error, linksError]);

  return null;
};

export default Alert;