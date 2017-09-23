/** @jsx h */

import { define } from 'skatejs/esnext';
import { Component, h } from '../_';

export default define(
  class NotFound extends Component {
    renderCallback() {
      return <div>Page not found</div>;
    }
  }
);
