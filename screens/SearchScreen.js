import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import axios from "axios";
import {TMDBAPI} from '@env';

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
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, color: 'white' }}
            onChangeText={text => this.setState({query: text}, () => this.search())}
            placeholder="Search Movie"
        />
      </SafeAreaView>
    <ScrollView style={styles.posts}>
      <View style={styles.row}>
        {this.state.suggestions && this.state.suggestions.map(post =>
        <View key={post.id} style={styles.column}>
          { post.poster_path ? <Image
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${post.poster_path}` }}
          /> : <Image
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{ uri: "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg" }}
          />}
          { post.release_date ? <Text style={styles.postTitle}>{post.title} ({post.release_date.substring(0, 4)})</Text> : <Text style={styles.postTitle}>{post.title}</Text> }
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
    fontSize: 15,
  },
  postPoster: {
    height: 300,
    width: 200,
    resizeMode: "cover",
    borderRadius: 10,
  }
});
export default SearchScreen;
