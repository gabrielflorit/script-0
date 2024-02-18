import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

interface TaskDemoSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TaskDemoComponent extends Component<TaskDemoSignature> {
  @tracked status = '';

  doSomething = task(async () => {
    this.status = 'Gimme one second...';
    await timeout(1000);
    this.status = 'Gimme one more second...';
    await timeout(1000);
    this.status = "OK, I'm done.";
  });
}
