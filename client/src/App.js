import React, { Suspense, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.scss'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loadUser } from './ducks/auth/authActions'
import Spinner from './components/Shared/Spinner/Spinner'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navbar/Navbar'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'))

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <React.Fragment>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/home" component={HomePage} />
            </Switch>
          </Fragment>
        </ErrorBoundary>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </Suspense>
    </React.Fragment>
  )
}

export default connect(
  null,
  { loadUser }
)(App)
