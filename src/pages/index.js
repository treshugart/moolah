/** @jsx h */

import { define, link, props } from 'skatejs/esnext';
import { Component, h, observer } from '../_';
import store from '../stores/clients';

export default define(
  @observer(store)
  class Index extends Component {
    static props = {
      client: props.string,
      clients: props.array
    };
    addClient = e => {
      e.preventDefault();
      Object.assign(store, {
        client: '',
        clients: store.clients.concat({ name: this.client })
      });
    };
    renderCallback({ client }) {
      return (
        <div>
          <h2>Clients</h2>
          {store.clients.length ? (
            <ul>{store.clients.map(client => <li>{client.name}</li>)}</ul>
          ) : (
            <p>You have no clients.</p>
          )}
          <form events={{ submit: this.addClient }}>
            <input
              name="client"
              type="text"
              events={{ keydown: link(this) }}
              value={client}
            />
            <button type="submit">Add client</button>
          </form>
          <h2>Invoices</h2>
          <p>You have no invoices.</p>
        </div>
      );
    }
  }
);
