import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
    {
      _id: '444666999',
      author: 'Robert Jonson',
      title: 'monster in the city',
      description: 'Something to be devoured.',
      imgSrc: 'https://files.fm/thumb_show.php?i=yp5aggzvr',
      date_publ: '2020-03-09',
    },
  ],
  fetchPublishedPosts: jest.fn(),
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});