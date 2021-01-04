import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import axios from "axios";
import {TMDBAPI} from '@env';
import { Rating } from 'react-native-ratings';

class SearchScreen extends React.Component {
    state = {
        query: "",
        suggestions: null,
        searched: false,
        TMDBAPI: TMDBAPI,
    };

    search = () =>{
        if(this.state.query){
            axios(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.TMDBAPI}&language=en-US&query=${this.state.query}&page=1&include_adult=false`)
            .then(result =>
                {
                    this.setState({
                      suggestions: result.data.results
                    })
                }
            ).catch(error => { console.error(error); return Promise.reject(error); });
        }
    }

    render() {

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TextInput editable
            style={styles.searchbar}
            onChangeText={text => this.setState({query: text}, () => this.search())}
            placeholder="Search Movie"
        />
      </SafeAreaView>
      <ScrollView style={styles.posts}>
      <View style={styles.row}>
        {this.state.suggestions && this.state.suggestions.map(post =>
        <TouchableOpacity style={styles.movie} key={post.id}
        onPress={() => this.props.navigation.navigate('SearchModal', {
          title: post.title,
          poster: post.poster_path,
          date: post.release_date,
          year: post.release_date.substring(0, 4),
          movieid: post.movieid,
          overview: post.overview,
          rating: post.vote_average,
        })} >

            <ImageBackground key={post.id} style={styles.column} source={ post.poster_path ? { uri: `https://image.tmdb.org/t/p/w500/${post.poster_path}` } : { uri: "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg" }}>
            { post.release_date ? <Text style={styles.midTitle}>{post.title} ({post.release_date.substring(0, 4)})</Text> : <Text style={styles.midTitle}>{post.title}</Text> }
          </ImageBackground>
          {/* <Rating
              readonly
              ratingCount={5}
              startingValue={post.vote_average/2}
              imageSize={30}
            /> */}

        </TouchableOpacity>
        )}
      </View>
      </ScrollView>

    </View>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    maxWidth: 200,
    height: 250,
    width: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  movie: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posts: {
    paddingTop: 10,
    width: '100%'
  },
  header: {
    margin: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    alignItems: 'center',
  },
  midTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    width: '100%',
    backgroundColor: "#000000a0"
  },
  postPoster: {
    height: 250,
    width: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  searchbar: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    borderRadius: 10,
  }
});
export default SearchScreen;
