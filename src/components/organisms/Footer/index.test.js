import React from 'react';
import { shallow } from 'enzyme';
import { Footer, Button } from 'components';

const setup = propOverrides => {
  const props = Object.assign(
    {
      visibilityFilter: 'SHOW_ALL',
      completedCount: 0,
      activeCount: 0,
      setVisibilityFilter: jest.fn(),
      onClearCompleted: jest.fn(),
    },
    propOverrides
  );

  const wrapper = shallow(<Footer {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Footer', () => {
  it('コンポーネントがレンダリングされていること', () => {
    const {
      props: { visibilityFilter },
      wrapper,
    } = setup();
    expect(wrapper.dive().type()).toBe('div');

    const TodoCount = wrapper.dive().find('TodoCount');
    expect(TodoCount.dive().type()).toBe('span');

    const TodoCountNumber = TodoCount.dive().find('TodoCountNumber');
    expect(TodoCountNumber.dive().type()).toBe('strong');

    const todoFilters = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'];
    const filterTitles = ['All', 'Active', 'Completed'];
    const Filters = wrapper.dive().find('Filters');
    expect(Filters.dive().type()).toBe('ul');
    expect(Filters.dive().children().length).toBe(3);
    Filters.dive()
      .children()
      .forEach((FilterItem, index) => {
        const FilterItemLink = FilterItem.dive().find('FilterItemLink');
        expect(FilterItem.key()).toBe(todoFilters[index]);
        expect(FilterItem.dive().type()).toBe('li');
        expect(FilterItemLink.dive().type()).toBe('a');
        expect(FilterItemLink.dive().prop('selected')).toBe(
          visibilityFilter === todoFilters[index]
        );
        expect(FilterItemLink.dive().prop('children')).toBe(
          filterTitles[index]
        );
      });
  });

  it('TodoCount のコンテンツが props.activeCount=0 の時正しく表示されること', () => {
    const { wrapper } = setup({ activeCount: 0 });
    const TodoCount = wrapper.dive().find('TodoCount');
    const textContent =
      TodoCount.dive()
        .childAt(0)
        .dive()
        .text() +
      TodoCount.dive()
        .childAt(1)
        .text() +
      TodoCount.dive()
        .childAt(2)
        .text() +
      TodoCount.dive()
        .childAt(3)
        .text();
    expect(textContent).toBe('No items left');
  });

  it('TodoCount のコンテンツが props.activeCount=1 の時正しく表示されること', () => {
    const { wrapper } = setup({ activeCount: 1 });
    const TodoCount = wrapper.dive().find('TodoCount');
    const textContent =
      TodoCount.dive()
        .childAt(0)
        .dive()
        .text() +
      TodoCount.dive()
        .childAt(1)
        .text() +
      TodoCount.dive()
        .childAt(2)
        .text() +
      TodoCount.dive()
        .childAt(3)
        .text();
    expect(textContent).toBe('1 item left');
  });

  it('TodoCount のコンテンツが props.activeCount>1 の時正しく表示されること', () => {
    const { wrapper } = setup({ activeCount: 2 });
    const TodoCount = wrapper.dive().find('TodoCount');
    const textContent =
      TodoCount.dive()
        .childAt(0)
        .dive()
        .text() +
      TodoCount.dive()
        .childAt(1)
        .text() +
      TodoCount.dive()
        .childAt(2)
        .text() +
      TodoCount.dive()
        .childAt(3)
        .text();
    expect(textContent).toBe('2 items left');
  });

  it('FilterItemLink の onClick で setVisibilityFilter が呼ばれること', () => {
    const {
      props: { setVisibilityFilter },
      wrapper,
    } = setup({ completedCount: 1 });
    const todoFilters = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'];
    const Filters = wrapper.dive().find('Filters');
    Filters.dive()
      .children()
      .forEach((FilterItem, index) => {
        const FilterItemLink = FilterItem.dive().find('FilterItemLink');
        FilterItemLink.simulate('click');
        expect(setVisibilityFilter).toHaveBeenCalledTimes(1);
        expect(setVisibilityFilter).toHaveBeenCalledWith(todoFilters[index]);
        setVisibilityFilter.mockClear();
      });
  });

  it('props.completedCount=0 の時 ClearCompletedButton がレンダリングされないこと', () => {
    const { wrapper } = setup({ completedCount: 0 });
    const ClearCompletedButton = wrapper.dive().find('ClearCompletedButton');
    expect(ClearCompletedButton.exists()).toBe(false);
  });

  it('props.completedCount>=1 の時 ClearCompletedButton がレンダリングされること', () => {
    const { wrapper } = setup({ completedCount: 1 });
    const ClearCompletedButton = wrapper.dive().find('ClearCompletedButton');
    expect(ClearCompletedButton.dive().type()).toBe(Button);
    expect(ClearCompletedButton.dive().prop('children')).toBe(
      'Clear completed'
    );
  });

  it('ClearCompletedButton の onClick で onClearCompleted が呼ばれること', () => {
    const {
      props: { onClearCompleted },
      wrapper,
    } = setup({ completedCount: 1 });
    const ClearCompletedButton = wrapper.dive().find('ClearCompletedButton');
    ClearCompletedButton.simulate('click');
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });
});
