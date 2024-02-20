import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface EditorSignature {
  // The arguments accepted by the component
  Args: { code: string };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class EditorComponent extends Component<EditorSignature> {}
