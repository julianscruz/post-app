import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Switch, Redirect } from 'wouter';

import PostList from './pages/postsList'
import PostTag from './pages/postsTag'
import Post from './pages/post'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <PostList />
        </Route>
        <Route path="/post/:id">
          {(params) => (
            <Post postId={params.id} />
          )}
        </Route>
        <Route path="/tag/:id">
          {(params) => (
            <PostTag tag={params.id} />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
