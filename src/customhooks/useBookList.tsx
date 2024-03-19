import {FC, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {BookListType} from '../types/bookListType';
import axios from 'axios';
import {GeneralBookType} from '../types/generalBookType';
import {defaultToGeneralBookList} from '../util';

type bookSealedType = {
  status: 'Success' | 'Failure' | 'Loading';
  data?: GeneralBookType[];
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
        let newList = defaultToGeneralBookList(response.data as BookListType);
        setBookList({
          status: 'Success',
          data: newList,
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
