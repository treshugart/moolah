// @flow

import Base from './base';

type Client = {
  name: string
};

class Clients extends Base {
  items: Array<Client>;
}

export default new Clients();
