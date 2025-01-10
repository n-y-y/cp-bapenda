# Blog App

A simple blogging webapp built using NodeJS, ExpressJS and MongoDb. Authenticated and authorization functions with passport

## Functions

- SignIn - Login into existing account
- SignUp - Signup using username and password
- Add Post - Add your post with an image and text
- Remove - Remove a post
- Edit - Edit an existing post
- Update Password - Update current password
- Modern UI - With modern UI card, navbar, sidebar, etc
- Admin - Only admin can create article

## Routes

- GET /articles - To view all the articles
- GET /user/:username - To view specific post by a user
- POST /articles/publish - To add new post (when user is authenticated andauthorized only)
- GET /articles/:id - To get a post with specific id
- PUT /articles/:id - To update specific post with unique Id
- Delete /articles/:id - To delete specific post with unique Id

## Project Archietecture

```tree
├── app.js
├── middleware
    └── index.js
├── models
    ├── comment.js
    ├── article.js
    └── user.js
├── package.json
├── package-lock.json
├── public
├── readme.md
├── routes
    ├── about.js
    ├── articles.js
    ├── comments.js
    ├── index.js
    ├── services.js
    └── user.js
└── views
    ├── about
        ├── about.hbs
    ├── articles
        ├── edit.hbs
        ├── index.hbs
        ├── new.hbs
        ├── show.hbs
        ├── user.hbs
    ├── partials
        ├── footer.hbs
        ├── header.hbs
        ├── navbar.hbs
        ├── sidebar.hbs
    ├── services
        ├── pbb.hbs
        ├── pbhtb.hbs
        ├── pdl.hbs
    ├── landing.hbs
    ├── login.hbs
    ├── register.hbs
    └── update-password.hbs
```

# How to run

- Git clone repository
- Then run these commands in terminal/shell

```npm
    npm install
    npm run start
    npm run dev
```
