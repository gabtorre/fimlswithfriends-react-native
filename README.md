<h1 align="center">
  <a href="https://movie-app-fe361.web.app/">
    Films with Friends Web Version
  </a>
</h1>
Films with Friends Mobile is a mobile app for rating and talking about movies that lets members post twitter-style hot takes on movies, share said reviews with friends for comments and discussion, and maintain lists of movies seen and movies yet-to-watch

<div style="margin-top: 5px; margin-bottom: 15px;">
  <img src="assets/Demo/V1_Demo.gif"/>
</div>
Demo Login: demo@gmail.com | Password: Demo2020
<hr/>

## colors
Font: off-white - ![#F5F5F1](https://via.placeholder.com/15/F5F5F1/000000?text=+) `#F5F5F1`
Buttons: red - ![#DC3545](https://via.placeholder.com/15/DC3545/000000?text=+) `#DC3545`
Seconary-Buttons: darker - ![#B81D24](https://via.placeholder.com/15/B81D24/000000?text=+) `#B81D24`
Primary-Background - ![#181D2F](https://via.placeholder.com/15/181D2F/000000?text=+) `#181D2F`
Seconary-Background: lighter - ![#0E111D](https://via.placeholder.com/15/0E111D/000000?text=+) `#0E111D`

## mvp features
- allow user login
- allow user log-out
- allow user to search for a movie
- allow user to post movie review
- allow user to post movie rating
- allow user to comment on another's review
- allow user to create a profile
- allow user to add movie to watch-list
- allow user to add movie to already-watched list
- allow user to comment
- allow CRUD of movies, at least on backend
- user view profile page
- working db integration with Firebase

## user stories
- user logs on, sees themed splash page
- user makes account or signs in with google
- user greeted with Activity Feed of reviews
- user comments on reviews, maybe
- (for production) user prompted to add their friends?
- user searches for a movie
- user rates / reviews a movie
- user adds other movies to their to-watch list
- user views / modifies their profile
- user logs oout



## Models and Properties
1. Users
    - displayName(username)
    - photoURL(profile picture)
    - watched(list)
    - ratings
    - watchlist
    - friendlist
2. Posts
    - comments
3. Ratings
    - movies
