import {FC, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, IconButton, Searchbar, TextInput} from 'react-native-paper';
import {cross, searchIcon} from '../imageExporter';
import React from 'react';

type props = {
  onSubmitFn?: Function;
};

const SearchBarWithIcon: FC<props> = ({onSubmitFn = () => {}}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder={'Search'}
      icon={searchIcon}
      style={styles.searchBar}
      value={searchQuery}
      onSubmitEditing={() => {
        onSubmitFn(searchQuery);
      }}
      onChangeText={setSearchQuery}
      clearIcon={cross}
      onClearIconPress={() => onSubmitFn('')}
    />
  );
};

export default React.memo(SearchBarWithIcon);

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
