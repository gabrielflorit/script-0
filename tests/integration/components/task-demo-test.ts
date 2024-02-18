import { module, test } from 'qunit';
import { setupRenderingTest } from 'script-0/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | task-demo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TaskDemo />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TaskDemo>
        template block text
      </TaskDemo>
    `);

    assert.dom().hasText('template block text');
  });
});
