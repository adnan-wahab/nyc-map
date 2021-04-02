// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
    return (
        <Router>
            <Route path="/blog" page={BlogPage} name="blog" />
            <Route notfound page={NotFoundPage} />
            <Route path="/" page={HomePage} />
        </Router>
    )
}

export default Routes
