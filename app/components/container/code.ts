import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface ContainerCodeSignature {}

export default class ContainerCodeComponent extends Component<ContainerCodeSignature> {
  @tracked code = `init = () => ({
  x: 32,
  y: 32,
  radius: 16,
})

update = (state) => ({ ...state })

draw = (state) => {
  rectFill(0, 0, 64, 64, 0)
  circFill(state.x, state.y, state.radius)
  rectFill(0, 0, 4, 4)
  rectFill(60, 0, 4, 4)
  rectFill(0, 60, 4, 4)
  rectFill(60, 60, 4, 4)
  line(0, 0, 64, 64)
  line(63, 0, 0, 63)
}
`;
}
