import {useCallback, useEffect, useState} from 'react';
import useBookList from './useBookList';
import useSearchBookList from './useSearchBookList';
import {GeneralBookType} from '../types/generalBookType';

export type bookSealedType = {
  status: 'Success' | 'Failure' | 'Loading';
  data?: GeneralBookType[];
  error?: string;
};

const useDefaultAndSearchedBook = () => {
  const {bookList} = useBookList();
  const {searchedBookList, onSearchSubmit} = useSearchBookList();

  const [myBookList, setMyBookList] = useState<bookSealedType>(bookList);

  useEffect(() => {
    setMyBookList(bookList);
  }, [bookList]);

  useEffect(() => {
    setMyBookList(searchedBookList);
  }, [searchedBookList]);

  const queryFn = useCallback((queryText: string) => {
    if (queryText.length < 2) {
      setMyBookList(bookList);
    } else {
      console.log('press');
      onSearchSubmit(queryText);
    }
  }, []);

  return {
    queryFn,
    myBookList,
  };
};

export default useDefaultAndSearchedBook;
