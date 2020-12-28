import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Firebase, { db } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function WatchList() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;
  const [movies] = useDocumentData(db.doc('users/' + currentUser));

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Watch List</Text>
    <ScrollView horizontal bounces style={styles.scrollView}>
      {movies && movies.watchlist.map(movie =>
        <View style={styles.movieDiv}>
          <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster}`,
          }}
          />
          <Text key={movie.movieid} style={styles.title}>{movie.title}</Text>
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#181D2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  movieDiv: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  image: {
    width: 150,
    height: 225,
    padding: 10,
    borderRadius: 25,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    width: 150,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
});
