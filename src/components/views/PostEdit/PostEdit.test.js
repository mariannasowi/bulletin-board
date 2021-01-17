import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post: {
    id: 1,
    content:
      'Hello hello hello where are you?',
    title: 'title',
    location: 'Warsaw',
    user: {
      id: '9273746452',
    },
    image: 'https://files.fm/thumb_show.php?i=r7wp7aj3n',
    email: 'john.doe@example.com',
    phone: '+48 366119467',
    price: '50.00',
    status: 'Published',
  },
  user: {
    authenticated: true,
    id: '73829235260',
  },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
