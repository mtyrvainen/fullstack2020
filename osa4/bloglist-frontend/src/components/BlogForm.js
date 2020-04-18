import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        const success = createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })

        if (success) {
            setBlogTitle('')
            setBlogAuthor('')
            setBlogUrl('')
        }
    }

    return (
        <div>
            <h2>Create a new blog listing</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title: <input type="text" value={blogTitle} name="title" onChange={({ target }) => setBlogTitle(target.value)} />
                </div>
                <div>
                    Author: <input type="text" value={blogAuthor} name="author" onChange={({ target }) => setBlogAuthor(target.value)} />
                </div>
                <div>
                    Url: <input type="text" value={blogUrl} name="url" onChange={({ target }) => setBlogUrl(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm