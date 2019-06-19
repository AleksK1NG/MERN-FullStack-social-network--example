import React from 'react'
import { Route, Switch } from 'react-router-dom'

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'))
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('../pages/RegisterPage/RegisterPage'))


const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </section>
  )
}

export default Routes
