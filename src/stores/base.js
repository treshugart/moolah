// @flow

import { observable } from 'mobx';
import { sync } from '../_';

export type Item = {
  id: number
};

export type Props = {
  items: Array<Item>
};

export function match(search, against) {
  if (typeof search === 'function') {
    return search(against);
  }
  if (search === against) {
    return true;
  }
  for (let name in search) {
    if (search[name] === against[name]) {
      return true;
    }
  }
}

export default sync(
  class<Props> {
    @observable items = [];
    add(item: Item) {
      this.items.push({
        id: this.items.length,
        ...item
      });
      return this;
    }
    find(item: Item) {
      return this.items.filter(match.bind(null, item))[0];
    }
    findAll(item: Item) {
      return this.items.filter(match.bind(null, item));
    }
    indexOf(item: Item) {
      return this.items.indexOf(this.find(item));
    }
    remove(item: Item) {
      const index = this.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      return this;
    }
    replace(item: Item, using: Item) {
      const index = this.indexOf(item);
      if (index > -1) {
        this.items[index] = using;
      }
      return this;
    }
  }
);
