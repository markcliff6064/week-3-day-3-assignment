# Week 3 Day 3 — API Integration

This project contains three JavaScript applications built to practice **APIs, fetch, async/await, JSON, DOM manipulation, error handling, and localStorage**.

## Projects

### 1. Currency Converter

* Converts between KES, USD, EUR, GBP, TZS, and UGX.
* Uses live exchange rates.
* Includes Convert and Swap buttons.
* Handles loading and API errors.

![shown](https://github.com/markcliff6064/week-3-day-3-assignment/blob/b6c68c703129f7b77be3afc4c14598e6f44e1b2b/Screenshot1.jpg)

### 2. GitHub Profile Viewer

* Searches for GitHub users.
* Displays avatar, name, bio, followers, following, and repositories.
* Shows the top 5 repositories with stars and language.
* Includes 5-minute localStorage caching.
* Handles users that do not exist.

![shown](https://github.com/markcliff6064/week-3-day-3-assignment/blob/b6c68c703129f7b77be3afc4c14598e6f44e1b2b/Screenshot2.jpg)

### 3. News Headline Aggregator

* Displays 10 sample news articles.
* Categories: Technology, Business, Sports, and Health.
* Includes category filtering.
* Displays title, source, date, and Read More link.

![shown](https://github.com/markcliff6064/week-3-day-3-assignment/blob/b6c68c703129f7b77be3afc4c14598e6f44e1b2b/Screenshot3.jpg)
## Technologies

* HTML
* CSS
* JavaScript
* Fetch API
* GitHub API
* Exchange Rate API
* localStorage

## Project Structure

```text
week-3-day-3-assignment/
│
├── currency.html
├── currency.js
├── github.html
├── github.js
├── news.html
├── news.js
├── styles.css
└── README.md
```

## Setup

### 1. Download or clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

Open the folder in **VS Code**.

### 3. Run the applications

Open any of these files in your browser:

```text
currency.html
github.html
news.html
```

For a better development experience, use the **Live Server** extension in VS Code.

No XAMPP, database, or backend server is required.

## APIs

Currency:

```text
https://open.er-api.com/v6/latest/KES
```

GitHub:

```text
https://api.github.com/users/{username}
```

The News application uses sample data, so no API key is required.

## GitHub Pages

After pushing the project to GitHub:

**Settings → Pages → Deploy from branch → main → / (root) → Save**

The project can then be accessed through your GitHub Pages URL.

## Screenshots

Add screenshots of:

* Currency Converter
* GitHub Profile Viewer
* News Aggregator

## Author

**Mark Mukami**

Week 3 — Day 3 JavaScript Assignment
