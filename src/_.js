import { autorun, toJS } from 'mobx';
import { h as preactH } from 'preact';
import { withComponent } from 'skatejs/esnext';
import val from '@skatejs/val';
import withPreact from '@skatejs/renderer-preact/esnext';

const withChildren = (Base = HTMLElement) =>
  class extends Base {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      if (this.childrenChangedCallback) {
        const mo = new MutationObserver(
          this.childrenChangedCallback.bind(this)
        );
        mo.observe(this, { childList: true });
        this.childrenChangedCallback();
      }
    }
  };

export const Component = withComponent(withChildren(withPreact()));
export const h = val(preactH);

export function observer(store) {
  return function(Child) {
    return class extends Child {
      constructor() {
        super();
        autorun(() => (this.props = toJS(store)));
      }
    };
  };
}
