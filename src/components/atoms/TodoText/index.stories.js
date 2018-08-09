import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import { TodoText } from 'components';

storiesOf('Atom|TodoText', module)
  .addDecorator((story, context) =>
    withInfo(`
      ~~~jsx
      <TodoText />
      ~~~
    `)(story)(context)
  )
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .addWithJSX('default', withNotes(``)(() => <TodoText />))
  .addWithJSX('props text', withNotes(``)(() => <TodoText text="hoge" />))
  .addWithJSX(
    'props text and handleEnter',
    withNotes(``)(() => <TodoText text="hoge" handleEnter={action('Enter')} />)
  );
