// @flow

import { autorun, computed, observable } from 'mobx';

type Client = {
  name: string
};

type ClientStore = {
  clients: Array<Client>
};

export default observable({
  clients: []
});
