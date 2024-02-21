import Component from '@glimmer/component';

interface EditorSignature {
  Args: { code: string; updateCode: (code: string) => void };
}

export default class EditorComponent extends Component<EditorSignature> {}
