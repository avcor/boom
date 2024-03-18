import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Work} from '../types/bookListType';
import FastImage from 'react-native-fast-image';

type props = {
  data: Work;
};

const BookCard: FC<props> = ({data}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.imageView}
          source={{
            uri:
              'https://covers.openlibrary.org/b/OLID/' +
              data.cover_edition_key +
              '-M.jpg',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text>{data.title}</Text>
        <Text>
          {'Authors: '}
          {data.authors.map((author, index) => {
            return index !== data.authors.length - 1
              ? author.name + ', '
              : author.name;
          })}
        </Text>
        <Text>
          {'Genre: '}
          {data.subject.map((val, index) => {
            return index < 3 ? val : null;
          })}
        </Text>
        <Text>{'Published :' + data.first_publish_year}</Text>
      </View>
    </View>
  );
};

export default BookCard;

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
});
