/** @jsx h */

import { define, link, props } from 'skatejs/esnext';
import { Component, h, observer } from '../_';
import clients from '../stores/clients';
import invoices from '../stores/invoices';

export default define(
  @observer
  class Index extends Component {
    static props = {
      client: props.string,
      invoice: props.number
    };
    stores = {
      clients,
      invoices
    };
    addClient = e => {
      e.preventDefault();
      this.stores.clients.add({ name: this.client });
      this.client = '';
    };
    addInvoice = e => {
      e.preventDefault();
      this.stores.invoices.add({ amount: this.invoice });
      this.invoice = '';
    };
    removeClient = id => {
      this.stores.clients.remove({ id });
    };
    removeInvoice = id => {
      this.stores.invoices.remove({ id });
    };
    renderCallback({ client, clients, invoice, invoices }) {
      return (
        <div>
          <h2>Clients</h2>
          <form events={{ submit: this.addClient }}>
            <input
              name="client"
              type="text"
              events={{ keydown: link(this) }}
              value={client}
            />
            <button type="submit">Add client</button>
          </form>
          {clients.length ? (
            <ul>
              {clients.map(client => (
                <li>
                  {client.name}{' '}
                  <button
                    events={{ click: () => this.removeClient(client.id) }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no clients.</p>
          )}
          <h2>Invoices</h2>
          <form events={{ submit: this.addInvoice }}>
            <input
              name="invoice"
              type="text"
              events={{ keydown: link(this) }}
              value={invoice}
            />
            <button type="submit">Add client</button>
          </form>
          {invoices.length ? (
            <ul>
              {invoices.map(invoice => (
                <li>
                  ${invoice.amount.toFixed(2)}{' '}
                  <button
                    events={{ click: () => this.removeInvoice(invoice.id) }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no inoices.</p>
          )}
        </div>
      );
    }
  }
);
