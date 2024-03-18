import React, {FC, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import BookCard from '../comp/BookCard';
import useBookList from '../customhooks/useBookList';
import SearchBarWithIcon from '../comp/SearchBarWithIcon';
import useSearchBookList from '../customhooks/useSearchBookList';

const HomeScreen: FC = ({}) => {
  const {bookList} = useBookList();
  const {searchedBookList} = useSearchBookList();

  const onSubmitSearchFn = useCallback(() => {
    console.log('press');
  }, []);

  console.log('view');

  return (
    <View style={styles.parent}>
      <SearchBarWithIcon onSubmitFn={onSubmitSearchFn} />
      <FlatList
        ItemSeparatorComponent={() => {
          return <View style={styles.sepratorCompoenent} />;
        }}
        data={bookList.data?.works}
        renderItem={({item}) => {
          return <BookCard data={item} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  sepratorCompoenent: {
    height: 13,
  },
  icon: {
    marginRight: 10,
  },
});
