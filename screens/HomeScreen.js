import React from "react";
import Posts from "../components/Post/Posts";
import Post from "../components/Post/Post";
import { View } from 'react-native';

class HomeScreen extends React.Component {
  state = {
    screen: "posts",
  };

  render() {
    return(
      <Post />
    // <View> { this.state.screen == "posts" ? <Posts/> : <Post/>} </View>
    )
  }
}

export default HomeScreen;
