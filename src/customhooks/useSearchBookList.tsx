import axios from 'axios';
import {useEffect, useState} from 'react';

const useSearchBookList = () => {
  const [searchedBookList, setSearchedBookList] = useState();

  const onSearchSubmit = (searchTerm: string, page = 1, limit = 20) => {
    const q = searchTerm.replace(/ /g, '+');
    axios
      .get(
        `https://openlibrary.org/search.json?q=${q}&page=${page}&limit=${limit}`,
      )
      .then(response => {
        // console.log('search');
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log('hook');
  useEffect(() => {
    onSearchSubmit('lord of the rings');
  });

  return {
    searchedBookList,
  };
};

export default useSearchBookList;
