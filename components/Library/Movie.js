import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Movie({title, poster}) {
  return (
    <View style={styles.movieDiv}>
      <Image
      style={styles.image}
      source={{
        uri: `https://image.tmdb.org/t/p/w500/${poster}`,
      }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieDiv: {
    width: 150,
    marginRight: 15,
  },
  image: {
    height: 225,
    borderRadius: 20,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
});
