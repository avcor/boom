import React, {FC, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import BookCard from '../comp/BookCard';
import SearchBarWithIcon from '../comp/SearchBarWithIcon';
import useDefaultAndSearchedBook from '../customhooks/useDefaultAndSearchedBook';
import {ActivityIndicator} from 'react-native-paper';
import {UpdateMode} from 'realm';
import {SavedBook} from '../db/modelClass';
import {GeneralBookType} from '../types/generalBookType';
import {useRealm} from '@realm/react';
import {favIcon} from '../imageExporter';

const HomeScreen: FC = ({}) => {
  const {myBookList, queryFn} = useDefaultAndSearchedBook();
  const realm = useRealm();

  const addProfile = useCallback((data: GeneralBookType) => {
    realm.write(() => {
      realm.create(
        SavedBook,
        {
          key: data.key,
          url: data.url,
          title: data.title,
          author: data.author,
          genre: data.genre,
          published: data.published,
        },
        UpdateMode.Modified,
      );
    });
  }, []);

  return (
    <View style={styles.parent}>
      <SearchBarWithIcon onSubmitFn={queryFn} />
      {myBookList.status === 'Loading' && <ActivityIndicator />}
      {myBookList.status === 'Success' && (
        <FlatList
          style={styles.flatlist}
          ItemSeparatorComponent={() => {
            return <View style={styles.sepratorCompoenent} />;
          }}
          data={myBookList.data}
          renderItem={({item}) => {
            return (
              <BookCard
                data={item}
                btn1={{
                  onPress: addProfile,
                  icon: favIcon,
                  text: 'Fav & save',
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {myBookList.status === 'Failure' && (
        <Text>{`Encountered Error ${myBookList.error}`}</Text>
      )}
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
  flatlist: {
    marginHorizontal: 10,
  },
});
