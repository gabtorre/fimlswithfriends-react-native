import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import DeleteButton from '../components/Library/DeleteButton';
import WatchButton from '../components/Library/WatchButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


export default function MovieModal({ route, navigation }) {

  const { title, poster, movieid, date, rating, list } = route.params;

  return (
    <View>
    <StatusBar hidden />
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <ImageBackground
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}`, }}
        >
          <View style={styles.btnsRow}>
            <WatchButton title={title} poster={poster} movieid={movieid} date={date} navigation={navigation} />
            <DeleteButton title={title} poster={poster} movieid={movieid} date={date} list={list} rating={rating} navigation={navigation} />
          </View>
          <LinearGradient
          colors={['transparent','rgba(24,29,47,1)']}
          style={styles.gradientPosition}
          />
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: '100%',
    backgroundColor: "#181D2F",
    paddingHorizontal: 20,
  },
  wrapper: {
    marginLeft: 20,
  },
  title: {
    color: '#F5F5F1',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
  },
  postPoster: {
    height: 500,
    minWidth: "100%",
    resizeMode: "cover",
  },
  btnsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 500,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  gradientPosition: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
    zIndex: 0,
  },
  close: {
    position: 'absolute',
    right: "5%",
    top: "5%",
    zIndex: 999,
    shadowOffset: { width: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5,
  }
});
