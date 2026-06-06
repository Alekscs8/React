# CineHub - React Course Project

CineHub is a React single page application for browsing movies and adding reviews. It uses components, routing, forms, hooks, authentication and REST API requests with json-server.

## Functionalities

- Home page with dynamically rendered movies from `db.json`
- Navigation bar with active links
- Register form
- Login form
- Authentication with localStorage session
- Protected route for adding new movies
- Movie details page
- Review form for authenticated users
- REST API requests with json-server
- Custom hook: `useFetch`
- Reusable components: Navbar, MovieCard, ProtectedRoute

## Technologies

- React
- Vite
- React Router DOM
- json-server
- CSS
- GitHub

## Start the project

```bash
npm install
npm run start
```

The React app runs on:

```bash
http://localhost:5173
```

The REST API runs on:

```bash
http://localhost:3001
```

## Demo login

```txt
Email: demo@demo.com
Password: 123456
```

## Suggested presentation flow

1. Show the home page and explain that the movie cards are loaded from the REST API.
2. Open a movie details page and show route parameters.
3. Register a new user.
4. Logout and login again.
5. Show the protected Add Movie page.
6. Add a new movie and show that it is saved in `db.json`.
7. Add a review to a movie.
8. Show the code structure: components, pages, hooks, context and API service.
9. Show the GitHub commit history.

## Suggested Git commits

Use multiple commits to prove that the project was built step by step:

```bash
git init
git add .
git commit -m "Initial React project setup"

git add .
git commit -m "Add routing and navigation"

git add .
git commit -m "Add authentication forms"

git add .
git commit -m "Connect app to REST API"

git add .
git commit -m "Add movie details and reviews"

git add .
git commit -m "Improve responsive design"
```

## GitHub upload

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_LINK
git push -u origin main
```

Do not upload `node_modules`.
This is a React course project with routing, authentication, forms, hooks and REST API requests.