import * as React from 'react'
import { render } from 'react-dom'
import Lottery from './Lottery'

function App() {
  return (
    <section>
      <Lottery />
    </section>
  )
}

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)
render(<App />, rootElement)
