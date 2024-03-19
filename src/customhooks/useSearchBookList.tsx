import axios from 'axios';
import {useEffect, useState} from 'react';
import {SearcBookedResult} from '../types/searchBookeResultType';
import {GeneralBookType} from '../types/generalBookType';
import {searchListToGeneralType} from '../util';

type bookSealedType = {
  status: 'Success' | 'Failure' | 'Loading';
  data?: GeneralBookType[];
  error?: string;
};

const useSearchBookList = () => {
  const [searchedBookList, setSearchedBookList] = useState<bookSealedType>({
    status: 'Loading',
  });

  const onSearchSubmit = (searchTerm: string, page = 1, limit = 20) => {
    const q = searchTerm.replace(/ /g, '+');
    setSearchedBookList({
      status: 'Loading',
    });
    axios
      .get(
        `https://openlibrary.org/search.json?q=${q}&page=${page}&limit=${limit}`,
      )
      .then(response => {
        let newList = searchListToGeneralType(
          response.data as SearcBookedResult,
        );
        setSearchedBookList({
          status: 'Success',
          data: newList,
          error: undefined,
        });
      })
      .catch(err => {
        console.log(err);
        setSearchedBookList({
          status: 'Failure',
          data: undefined,
          error: err.message,
        });
      });
  };

  console.log('hook');

  return {
    searchedBookList,
    onSearchSubmit,
  };
};

export default useSearchBookList;
