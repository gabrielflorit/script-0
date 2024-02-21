import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface ContainerCodeSignature {}

export default class ContainerCodeComponent extends Component<ContainerCodeSignature> {
  code = `init = {
  x: 32,
  y: 32,
  radius: 16,
}

update = (state, isClicked) => ({
  ...state,
  radius: 16 + (isClicked ? 8 : 0)
})

draw = (state) => {
  circFill(state.x, state.y, state.radius)
}
`;
  @tracked _code = this.code;

  @action
  updateCode(code: string) {
    this._code = code;
  }
}
