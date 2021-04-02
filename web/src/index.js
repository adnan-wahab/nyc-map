import ReactDOM from 'react-dom'
import { FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import Routes from 'src/Routes'

import './index.css'

ReactDOM.render(
    <FatalErrorBoundary page={FatalErrorPage}>
        <Routes />
    </FatalErrorBoundary>,
    document.getElementById('redwood-app')
)
