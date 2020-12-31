import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteButton from '../components/Library/DeleteButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MovieModal({ route, navigation }) {

  const { title, poster, movieid, date, rating, list } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()} >
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <Image
      style={styles.image}
      source={{
        uri: `https://image.tmdb.org/t/p/w500/${poster}`,
      }}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <DeleteButton title={title} poster={poster} movieid={movieid} date={date} list={list} rating={rating} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#181D2F',
  },
  wrapper: {
    marginLeft: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
  },
  image: {
    height: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 999,
  }
});
