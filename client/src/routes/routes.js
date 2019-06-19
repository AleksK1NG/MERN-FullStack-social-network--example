import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'))
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('../pages/RegisterPage/RegisterPage'))
const DashboardPage = React.lazy(() => import('../pages/DashboardPage/DashboardPage'))

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </section>
  )
}

export default Routes
