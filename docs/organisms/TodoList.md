# [TodoList](../../src/components/organisms/TodoList)

## コンポーネントの階層構造

* TodoList
    * Wrapper（ul）
        * TodoItem（li）

## Props

| property | propType | required | default | description |
|----------|----------|----------|---------|-------------|
| todos | [{... <br> id: number, <br> text: string, <br> completed: bool, <br> }] | yes | | |
| completeTodo | func | yes | | |
| deleteTodo | func | yes | | |
| editTodo | func | yes | | |
| onClearCompleted | func | yes | | |

## State

None.

## 準備

### ファイル

```shell
$ mkdir src/components/organisms/TodoList
$ touch src/components/organisms/TodoList/index.js
$ touch src/components/organisms/TodoList/index.stories.js
$ touch src/components/organisms/TodoList/index.test.js
```

### コンポーネント

_src/components/organisms/TodoList/index.js_

```jsx
import React from 'react';

const TodoList = () => <ul />;

export default TodoList;
```

### コンポーネントのストーリー

_src/components/organisms/TodoList/index.stories.js_

```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import { TodoList } from 'components';

storiesOf('Organism|TodoList', module)
  .addDecorator((story, context) =>
    withInfo(`
      ~~~jsx
      <TodoList />
      ~~~
    `)(story)(context)
  )
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .addWithJSX(
    'default',
    withNotes(``)(() => (
      <TodoList
        todos={[
          {
            id: 0,
            text: 'foo',
            completed: false,
          },
          {
            id: 1,
            text: 'bar',
            completed: false,
          },
        ]}
        completeTodo={action('Complete')}
        deleteTodo={action('Delete')}
        editTodo={action('Edit')}
      />
    ))
  );
```

### コンポーネントのテスト

_src/components/organisms/TodoList/index.test.js_

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import { TodoList } from 'components';

const setup = () => {
  const props = {
    todos: [
      {
        id: 0,
        text: 'foo',
        completed: false,
      },
      {
        id: 1,
        text: 'bar',
        completed: true,
      },
    ],
    completeTodo: jest.fn(),
    deleteTodo: jest.fn(),
    editTodo: jest.fn(),
  };

  const wrapper = shallow(<TodoList {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('TodoList', () => {
  it('コンポーネントがレンダリングされていること', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).toBe('ul');
  });
});
```

> **PASS**  src/components/organisms/TodoList/index.test.js
