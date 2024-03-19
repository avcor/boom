import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GeneralBookType} from '../types/generalBookType';
import {Button, IconButton} from 'react-native-paper';
import {favIcon} from '../imageExporter';
import React from 'react';

type props = {
  data: GeneralBookType;
  btn1?: {
    onPress: (data: GeneralBookType) => void;
    icon: any;
    text: string;
  };
};

const BookCard: FC<props> = ({
  data,
  btn1 = {
    onPress: () => {},
    icon: favIcon,
    text: '',
  },
}) => {
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

        <Button
          icon={favIcon}
          onPress={() => {
            btn1.onPress(data);
          }}
          style={styles.fav}>
          {btn1.text}
        </Button>
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
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
