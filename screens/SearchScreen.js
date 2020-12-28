import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";
import {TMDBAPI} from '@env';

class SearchScreen extends React.Component {
    state = {
        query: "",
        suggestions: null,
        searched: false,
        TMDBAPI: TMDBAPI
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

    handleInput = (e) => {
        this.setState(
          {
            query: e.target.value,
            searched: true,
          }
          , () => this.search()
        );
      };


    render() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TextInput editable
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, color: 'white' }}
            onChange={this.handleInput}
            placeholder="Search Movie"
        />
      </SafeAreaView>
    <ScrollView style={styles.posts}>
      <View style={styles.row}>
        {this.state.suggestions && this.state.suggestions.map(post =>
        <View key={post.id} style={styles.column}>
          <Image
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${post.poster_path}` }}
          />
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postTitle}>{post.release_date}</Text>
        </View>
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
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
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
  postTitle: {
    color: 'white',
  },
  postPoster: {
    height: 400,
    width: 300,
    resizeMode: "cover",
    borderRadius: 10,
  }
});
export default SearchScreen;
