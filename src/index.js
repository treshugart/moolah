/** @jsx h */

import { define } from 'skatejs';
import { Component, h } from './_';
import { Body, Footer, Nav, Route, Router } from './components';

define(
  class App extends Component {
    static is = 'moo-lah';
    renderCallback() {
      return (
        <div>
          <Nav />
          <Body>
            <Router hashbang popstate={false} dispatch={false}>
              <Route page={() => import('./pages')} path="/" />
              <Route page={() => import('./pages/clients')} path="/clients" />
              <Route page={() => import('./pages/invoices')} path="/invoices" />
              <Route page={() => import('./pages/not-found')} path="*" />
            </Router>
          </Body>
          <Footer />
        </div>
      );
    }
  }
);
