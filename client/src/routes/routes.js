import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'



const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('../pages/RegisterPage/RegisterPage'))
const DashboardPage = React.lazy(() => import('../pages/DashboardPage/DashboardPage'))
const CreateProfilePage = React.lazy(() => import('../pages/CreateProfilePage/CreateProfilePage'))
const EditProfilePage = React.lazy(() => import('../pages/EditProfilePage/EditProfilePage'))
const AddEducationPage = React.lazy(() => import('../pages/AddEducationPage/AddEducationPage'))
const AddExperiencePage = React.lazy(() => import('../pages/AddExperiencePage/AddExperiencePage'))
const ProfilePage = React.lazy(() => import('../pages/ProfilePage/ProfilePage'))
const ProfilesPage = React.lazy(() => import('../pages/ProfilesPage/ProfilesPage'))
const PostsPage = React.lazy(() => import('../pages/PostsPage/PostsPage'))
const PostPage = React.lazy(() => import('../pages/PostPage/PostPage'))

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        <ProtectedRoute exact path="/create-profile" component={CreateProfilePage} />
        <ProtectedRoute exact path="/edit-profile" component={EditProfilePage} />
        <ProtectedRoute exact path="/add-education" component={AddEducationPage} />
        <ProtectedRoute exact path="/add-experience" component={AddExperiencePage} />
        <Route exact path="/profile/:id" component={ProfilePage} />
        <Route exact path="/profiles" component={ProfilesPage} />
        <Route exact path="/posts" component={PostsPage} />
        <Route exact path="/posts/:id" component={PostPage} />
      </Switch>
    </section>
  )
}

export default Routes
