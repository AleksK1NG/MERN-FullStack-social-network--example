import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'


const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('../pages/RegisterPage/RegisterPage'))
const DashboardPage = React.lazy(() => import('../pages/DashboardPage/DashboardPage'))
const CreateProfilePage = React.lazy(() => import('../pages/CreateProfilePage/CreateProfilePage'))
const EditProfilePage = React.lazy(() => import('../pages/EditProfilePage/EditProfilePage'))

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        <ProtectedRoute exact path="/create-profile" component={CreateProfilePage} />
        <ProtectedRoute exact path="/edit-profile" component={EditProfilePage} />
      </Switch>
    </section>
  )
}

export default Routes
