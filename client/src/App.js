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
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/RegisterPage'))

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={LandingPage} />
            <section className="container">
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
              </Switch>
            </section>
          </Fragment>
        </ErrorBoundary>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </Suspense>
    </Fragment>
  )
}

export default connect(
  null,
  { loadUser }
)(App)
