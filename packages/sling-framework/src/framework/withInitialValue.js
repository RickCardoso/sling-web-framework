import { LitElement } from '@polymer/lit-element';
import { globalHelper } from 'sling-helpers';

export const withInitialValue = (Base = LitElement) =>
  class extends Base {
    static get _initializedProperties() {
      return globalHelper.pickBy(this.properties || {}
        , ({ value }) => value != null);
    }

    connectedCallback() {
      this._setInitialValues();
      super.connectedCallback();
    }

    _setInitialValues() {
      const { _initializedProperties } = this.constructor;

      Object
        .entries(_initializedProperties)
        .forEach(([propName, propValue]) => {
          if (this[propName] == null && (!propValue.reflectToAttribute
            || !this.hasAttribute(propName))) {
            this[propName] = propValue.value;
          }
        });
    }
  };
