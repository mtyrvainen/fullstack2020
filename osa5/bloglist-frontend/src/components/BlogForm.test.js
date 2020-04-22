import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  test('calls the given callback function with correct data', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Blog Title' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Blog Author' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'Blog URL' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Blog Author')
    expect(createBlog.mock.calls[0][0].url).toBe('Blog URL')
  })
})