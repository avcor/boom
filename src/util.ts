import { BookListType } from "./types/bookListType";
import { GeneralBookType } from "./types/generalBookType";
import { SearcBookedResult } from "./types/searchBookeResultType";

export const defaultToGeneralBookList = (data: BookListType) => {
    let generalBookTypeList: GeneralBookType[] = [];
  
    data.works.forEach(book => {
      generalBookTypeList.push({
        key: book.key,
        url: book.cover_edition_key,
        title: book.title,
        author: book.authors.map(author => author.name),
        genre: book.subject,
        published: book.first_publish_year.toString(),
      });
    });
  
    return generalBookTypeList;
  };
  
  export const searchListToGeneralType = (data: SearcBookedResult) => {
    let generalBookTypeList: GeneralBookType[] = [];
  
    data.docs.forEach(element => {
      generalBookTypeList.push({
        key: element.key,
        url: element.cover_edition_key ?? '',
        title: element.title,
        author: element.author_name ?? [],
        genre: [],
        published: element.first_publish_year?.toString() ?? '',
      });
    });
  
    return generalBookTypeList;
  };
  