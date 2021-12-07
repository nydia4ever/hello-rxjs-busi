import * as React from 'react'
import { render } from 'react-dom'
import Lottery from './Lottery'

function App() {
  const [text, updateText] = React.useState('')

  return (
    <section style={{ margin: 20 }}>
      <Lottery />
    </section>
  )
}

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)
render(<App />, rootElement)
