// @flow

import Base from './base';

type Invoice = {
  amount: number
};

class Invoices extends Base {
  items: Array<Invoice>;
}

export default new Invoices();
