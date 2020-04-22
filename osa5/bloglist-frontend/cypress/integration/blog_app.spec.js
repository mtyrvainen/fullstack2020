describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password1'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Log in button is shown and login form can be opened', function() {
    cy.contains('Blog')
    cy.contains('Log in').click()
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('successful with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('Welcome Test User')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Error: Wrong password or username')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('New blog listing').click()

      cy.get('#title').type('Blog about movies')
      cy.get('#author').type('Movie Fan')
      cy.get('#url').type('www.moviefansblog.com')
      cy.get('#add-blog').click()

      cy.get('.notification').should('contain', 'added')
      cy.get('.blog-entry').should('contain', '"Blog about movies" by Movie Fan')
    })

    it('a user can remove a blog he has created', function() {
      cy.contains('New blog listing').click()

      cy.get('#title').type('Blog about movies')
      cy.get('#author').type('Movie Fan')
      cy.get('#url').type('www.moviefansblog.com')
      cy.get('#add-blog').click()

      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.get('.notification').should('contain', 'removed')
      cy.get('.blog-entry').should('not.exist')
    })
  })

  describe('When db already contains a blog entry', function() {
    beforeEach(function() {
      const user2 = {
        name: 'Another Test User',
        username: 'testuser2',
        password: 'password2'
      }

      cy.request('POST', 'http://localhost:3001/api/users/', user2)
      cy.visit('http://localhost:3000')

      cy.contains('Log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('New blog listing').click()

      cy.get('#title').type('Blog about movies')
      cy.get('#author').type('Movie Fan')
      cy.get('#url').type('www.moviefansblog.com')
      cy.get('#add-blog').click()
      cy.get('.notification', { timeout: 1000 }).should('contain', 'added')

      cy.contains('Logout').click()
    })

    it('a logged in user cannot remove blogs he has not created', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('testuser2')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.contains('View').click()
      cy.get('#remove-blog-button').should('not.exist')
    })

    it('a non-logged in user cannot remove blogs', function() {
      cy.contains('View').click()
      cy.get('#remove-blog-button').should('not.exist')
    })

    it('like button press on the blog increases likes by one', function() {
      cy.contains('View').click()
      cy.get('#blog-like-button').click()
      cy.contains('Likes: 1').should('exist')
      cy.get('.notification').should('contain', '+1')
    })
  })

  describe('When list constains multiple blogs', function() {
    it('blogs are listed by likes in descending order', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('New blog listing').click()

      cy.get('#title').type('Blog about movies')
      cy.get('#author').type('Movie Fan')
      cy.get('#url').type('www.moviefansblog.com')
      cy.get('#add-blog').click()
      cy.get('.notification', { timeout: 1000 }).should('contain', 'added')

      cy.contains('New blog listing').click()

      cy.get('#title').type('Another Game Blog')
      cy.get('#author').type('Gamer')
      cy.get('#url').type('games.games.com')
      cy.get('#add-blog').click()
      cy.get('.notification', { timeout: 1000 }).should('contain', 'added')

      cy.wait(500)

      cy.get('.blog-entry').eq(1).contains('View').click()
      cy.get('.blog-entry').eq(1).contains('Like').click()

      cy.wait(500)

      cy.get('.blog-entry').eq(0).get('.blogUrl').contains('games.games.com')
    })
  })
})
