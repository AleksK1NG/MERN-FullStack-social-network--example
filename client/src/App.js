import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './ducks/auth/authActions';
import Spinner from './components/Shared/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <React.Fragment>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <main style={{ marginTop: '55px' }}>
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </main>
        </ErrorBoundary>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </Suspense>
    </React.Fragment>
  );
};

export default connect(
  null,
  { loadUser }
)(App);
