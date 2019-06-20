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

const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'))
const Routes = React.lazy(() => import('./routes/routes'))

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route component={Routes} />
            </Switch>
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
