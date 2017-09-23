/** @jsx h */

import { define } from 'skatejs/esnext';
import { Component, h } from '../_';
import { autorun } from 'mobx';
import store from '../stores/clients';

export default define(
  class Clients extends Component {
    renderCallback() {
      return (
        <div>
          {store.clients.length ? (
            <ul>{store.clients.map(client => <li>{client.name}</li>)}</ul>
          ) : (
            <p>No clients</p>
          )}
        </div>
      );
    }
  }
);
