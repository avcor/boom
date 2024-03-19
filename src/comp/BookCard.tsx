import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Work} from '../types/bookListType';
import FastImage from 'react-native-fast-image';
import {GeneralBookType} from '../types/generalBookType';
import {IconButton} from 'react-native-paper';
import {favIcon} from '../imageExporter';
import React from 'react';
import {useRealm} from '@realm/react';
import {BSON, UpdateMode} from 'realm';
import {Profile, SavedBook} from '../db/modelClass';

type props = {
  data: GeneralBookType;
  onSaveFn?: (data: GeneralBookType) => void;
};

const BookCard: FC<props> = ({data, onSaveFn = () => {}}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.imageView}
          source={{
            uri: 'https://covers.openlibrary.org/b/OLID/' + data.url + '-M.jpg',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text>{data.title}</Text>
        <Text>
          {'Authors: '}
          {data.author.map((author, index) => {
            return index !== data.author.length - 1 ? author + ', ' : author;
          })}
        </Text>
        <Text>
          {'Genre: '}
          {data.genre.map((val, index) => {
            return index < 3 ? val : null;
          })}
        </Text>
        <Text>{'Published :' + data.published}</Text>

        <IconButton
          icon={favIcon}
          onPress={() => {
            onSaveFn(data);
          }}
          style={styles.fav}
        />
      </View>
    </View>
  );
};

export default React.memo(BookCard);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: '100%',
    width: '100%',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1.5,
    paddingTop: 10,
  },
  fav: {
    alignSelf: 'flex-end',
    marginEnd: 20,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
