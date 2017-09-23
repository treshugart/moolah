/** @jsx h */

import page from 'page';
import { define, props } from 'skatejs/esnext';
import { Component, h } from './_';

export const Body = define(
  class Body extends Component {
    renderCallback() {
      return (
        <div>
          <slot />
        </div>
      );
    }
  }
);

export const Link = define(
  class Link extends Component {
    static props = {
      href: props.string
    };
    go = e => {
      e.preventDefault();
      page.show(this.href);
    };
    renderCallback({ href }) {
      return (
        <a href={href} events={{ click: this.go }}>
          <slot />
        </a>
      );
    }
  }
);

export const Footer = define(
  class Footer extends Component {
    renderCallback() {
      return (
        <div>
          <slot />
        </div>
      );
    }
  }
);

export const Nav = define(
  class Nav extends Component {
    renderCallback() {
      return (
        <div>
          <Link href="/">Home</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/invoices">Invoices</Link>
        </div>
      );
    }
  }
);

export const Route = define(
  class Route extends Component {
    static props = {
      page: null,
      PageToRender: null,
      path: props.string,
      propsToRender: props.object
    };
    propsUpdatedCallback(next, prev) {
      let { PageToRender } = next;
      if (PageToRender) {
        if (typeof PageToRender === 'function' && !PageToRender.prototype) {
          PageToRender = PageToRender();
        }
        if (PageToRender.then) {
          PageToRender.then(Page => (this.PageToRender = Page.default || Page));
        }
      }
      return super.propsUpdatedCallback(next, prev);
    }
    renderCallback({ PageToRender, propsToRender }) {
      if (
        PageToRender &&
        PageToRender.prototype &&
        PageToRender.prototype.renderCallback
      ) {
        return <PageToRender />;
      }
    }
  }
);

export const Router = define(
  class Router extends Component {
    childrenChangedCallback() {
      [...this.children].forEach(route => {
        page(route.path, (ctxt, next) => {
          route.propsToRender = ctxt;
          route.PageToRender = route.page;
        });
        page.exit(route.path, (ctxt, next) => {
          route.PageToRender = null;
          next();
        });
      });
      page.start();
    }
    renderCallback() {
      return <slot />;
    }
  }
);
