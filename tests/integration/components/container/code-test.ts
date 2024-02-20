import { module, test } from 'qunit';
import { setupRenderingTest } from 'script-0/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | container/code', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Container::Code />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Container::Code>
        template block text
      </Container::Code>
    `);

    assert.dom().hasText('template block text');
  });
});