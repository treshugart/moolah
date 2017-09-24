import { autorun, toJS } from 'mobx';
import { h as preactH } from 'preact';
import { props, withComponent } from 'skatejs/esnext';
import localforage from 'localforage';
import val from '@skatejs/val';
import withPreact from '@skatejs/renderer-preact/esnext';

export const Component = withComponent(withPreact());
export const h = val(preactH);

export function observer(Component) {
  return class extends Component {
    constructor() {
      super();
      const { stores } = this;

      // This dynamically adds props post construction, so this happens for every instance that is created. One way to
      // make this more efficient is to allow for this as an edge case, but to use staticially defined stores on the
      // class instead.
      Component.props = Object.keys(stores).reduce((prev, curr) => {
        prev[curr] = props.array;
        return prev;
      }, {});

      // Define an updater for each store. Doing this separately for each store ensures that if one store is updated,
      // the others aren't triggered.
      Object.keys(stores).forEach(key => {
        autorun(() => (this[key] = toJS(stores[key].items)));
      });
    }
  };
}

// Returns a new object with only the values that pass the filter function.
export function filter(obj, keep = val => typeof val !== 'undefined') {
  return Object.keys(obj || {}).reduce((prev, curr) => {
    if (keep(obj[curr])) {
      prev[curr] = obj[curr];
    }
    return prev;
  }, {});
}

export function sync(Store) {
  return class extends Store {
    constructor() {
      super();

      // We use the name of the class as the store name. To override this, define a getter for the static name prop.
      const name = this.constructor.name;

      // Ensure that when the instance is constructed, all data is synced to it.
      localforage
        .getItem(name)
        .then(filter)
        .then(data => Object.assign(this, data));

      // Write all data back to the store. This ensures it's kept in sync. Something we may want to think about doing
      // here would be to *not* update the store on the initial calling of this. However, we'd need to ensure that for
      // the initial calling, the toJS function is still called on the store to initialse the observers.
      autorun(() => localforage.setItem(name, toJS(this)));
    }
  };
}
