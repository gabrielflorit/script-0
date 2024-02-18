import { action } from '@ember/object';
import Component from '@glimmer/component';

interface ButtonTestSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class ButtonTestComponent extends Component<ButtonTestSignature> {
  @action
  clickHandler() {
    console.log('a click handler');
  }
}
