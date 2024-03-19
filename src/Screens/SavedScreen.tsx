import {useRealm} from '@realm/react';
import {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SavedBook} from '../db/modelClass';
import {GeneralBookType} from '../types/generalBookType';
import {bookSealedType} from '../types/bookSealadType';
import {ActivityIndicator} from 'react-native-paper';
import BookCard from '../comp/BookCard';
import {favIcon} from '../imageExporter';

const SavedScreen: FC = () => {
  const realm = useRealm();
  const savedBook = realm.objects<SavedBook>('SavedBook');

  const [savedBookList, setSavedBookList] = useState<bookSealedType>({
    status: 'Loading',
  });

  useEffect(() => {
    savedBook.addListener(() => {
      setSavedBookList({
        status: 'Success',
        data: savedBook.toJSON() as GeneralBookType[],
      });
    });

    return () => {
      savedBook.removeAllListeners();
    };
  }, []);

  const deleteProfile = (data: GeneralBookType) => {
    const toDelete = realm.objects(SavedBook).filtered('key == $0', data.key);
    realm.write(() => {
      realm.delete(toDelete);
    });
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.heading}>Saved And Favourite Boooks</Text>
      {savedBookList.status === 'Loading' && <ActivityIndicator />}
      {savedBookList.status === 'Success' && (
        <FlatList
          style={styles.flatlist}
          ItemSeparatorComponent={() => {
            return <View style={styles.sepratorCompoenent} />;
          }}
          data={savedBookList.data}
          renderItem={({item}) => {
            return (
              <BookCard
                data={item}
                btn1={{
                  onPress: deleteProfile,
                  icon: favIcon,
                  text: 'UnSave',
                }}
              />
            );
          }}
        />
      )}
      {savedBookList.status === 'Failure' && (
        <Text>{`Encountered Error ${savedBookList.error}`}</Text>
      )}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 17,
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
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
