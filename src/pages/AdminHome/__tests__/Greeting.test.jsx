import React from 'react';
import sinon from 'sinon';
import { render, fireEvent } from '../../../test-utils';

import Greeting from '../Greeting';

describe('Greeting tests', () => {
  const props = { onConfirm: sinon.spy() };
  const initialState = { user: { name: 'UserMockedName' } };

  let wrapper;

  beforeEach(() => {
    wrapper = render(<Greeting {...props} />, {
      initialState,
    });
  });

  it('should render correctly', () => {
    const { container } = wrapper;
    expect(container).toMatchSnapshot();
  });

  it('should call onClose on cancel or exit click + start with confirm button disabled', async () => {
    const { findByTestId } = wrapper;

    const helloNode = await findByTestId('hello-msg');
    const createButtonNode = await findByTestId('create-store-btn');
    const { onConfirm } = props;

    expect(helloNode.textContent).toContain('UserMockedName');

    fireEvent.click(createButtonNode);
    expect(onConfirm.called).toBeTruthy();
  });
});
