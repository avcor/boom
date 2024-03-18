import {FC, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {BookListType} from '../types/bookListType';
import axios from 'axios';

type bookSealedType = {
  status: 'Success' | 'Failure' | 'Loading';
  data?: BookListType;
  error?: string;
};

const useBookList = () => {
  const [bookList, setBookList] = useState<bookSealedType>({
    status: 'Loading',
  });

  const getBookList = () => {
    setBookList({
      status: 'Loading',
    });
    axios
      .get('https://openlibrary.org/subjects/sci-fi.json')
      .then(response => {
        setBookList({
          status: 'Success',
          data: response.data as BookListType,
          error: undefined,
        });
        console.log('deafult list');
      })
      .catch(error => {
        setBookList({
          status: 'Failure',
          data: undefined,
          error: error.message,
        });
      });
  };

  useEffect(() => {
    getBookList();
  }, []);

  return {
    bookList,
    getBookList,
  };
};

export default useBookList;
