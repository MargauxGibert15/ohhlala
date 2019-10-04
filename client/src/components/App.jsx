import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import MyPattern from './pages/MyPattern'
// import CreatePattern from './pages/CreatePattern'
import Library from './pages/Library'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePattern2 from './pages/CreatePattern2'
// import '../node_modules/bootstrap/scss/bootstrap.scss'
// import { Button } from 'reactstrap'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/my-pattern" component={MyPattern} />

        {/* <Route
          path="/create-pattern"
          render={routeProps => {
            return (
              <CreatePattern
                {...routeProps}
                Canvas={{ width: '1000', height: '1000' }}
                // .canvas-wrapper %canvas#foo{ width: '1000', height: '1000' }
              />
            )
          }}
        /> */}

        <Route path="/create-pattern" component={CreatePattern2}></Route>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/library" component={Library} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
