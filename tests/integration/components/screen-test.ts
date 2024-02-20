import { module, test } from 'qunit';
import { setupRenderingTest } from 'script-0/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | screen', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Screen />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Screen>
        template block text
      </Screen>
    `);

    assert.dom().hasText('template block text');
  });
});
