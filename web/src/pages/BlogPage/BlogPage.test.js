import { render } from '@redwoodjs/testing'

import BlogPage from './BlogPage'

describe('BlogPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<BlogPage />)
        }).not.toThrow()
    })
})
