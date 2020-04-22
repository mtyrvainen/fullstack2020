import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  let mockLikeHandler = jest.fn()
  let mockRemoveHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Testblog',
      author: 'Tester McPersoner',
      url: 'www.testblog.test/blog',
      likes: 6,
      user: {
        name: 'User Name',
        username: 'uname'
      }
    }

    mockLikeHandler = jest.fn()
    mockRemoveHandler = jest.fn()

    component = render(
      <Blog blog={blog} handleLikes={mockLikeHandler} removeBlog={mockRemoveHandler} />
    )
  })

  test('blog entry is rendered, initial content (including blog title and author) is rendered and visible', () => {
    expect(component.container.querySelector('.blog-entry')).toBeDefined()
    expect(component.container.querySelector('.initialToggleContent')).toBeDefined()
    expect(component.container.querySelector('.initialToggleContent')).not.toHaveStyle('display: none')
    expect(component.container.querySelector('.initialToggleContent')).toHaveTextContent('Testblog" by Tester McPersonerView')
  })

  test('toggled content (including blog URL and likes) are rendered but not visible', () => {
    expect(component.container.querySelector('alternativeToggleContent')).toBeDefined()
    expect(component.container.querySelector('.alternativeToggleContent')).toHaveStyle('display: none')
    expect(component.container.querySelector('.blogTitle')).toHaveTextContent('"Testblog" by Tester McPersoner')
    expect(component.container.querySelector('.blogUrl')).toHaveTextContent('URL: www.testblog.test/blog')
    expect(component.container.querySelector('.blogLikes')).toHaveTextContent('6')
  })

  test('pressing \'view\' button hides initial content and displays alternative content', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container.querySelector('.initialToggleContent')).toHaveStyle('display: none')
    expect(component.container.querySelector('.alternativeToggleContent')).not.toHaveStyle('display: none')
  })

  test('pressing \'Like\' button twice fires the event handler function twice', () => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
