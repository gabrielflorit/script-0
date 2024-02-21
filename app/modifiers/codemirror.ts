import { modifier } from 'ember-modifier';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default modifier(
  (
    element: HTMLElement,
    [code, updateCode]: [string, (code: string) => void],
  ) => {
    let onUpdate = EditorView.updateListener.of((value) => {
      updateCode(value.state.doc.toString());
    });

    let view = new EditorView({
      doc: code,
      parent: element,
      extensions: [basicSetup, javascript(), onUpdate],
    });

    return () => {
      view.destroy();
    };
  },
);
