import { Link, routes } from '@redwoodjs/router'

const BlogPage = () => {
    return (
        <>
            <h1>BlogPage</h1>
            <p>
                Find me in <code>./web/src/pages/BlogPage/BlogPage.js</code>
            </p>
            <p>
                My default route is named <code>blog</code>, link to me with `
                <Link to={routes.blog()}>Blog</Link>`
            </p>
        </>
    )
}

export default BlogPage
