// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = React.createContext() // Defino el contexto

function Toggle({children}) {
  // Esta funcion retorna el contexto y forwardea sus hijos
  // Pasa como value el arreglo [booleano, funcion que modifica booleano]
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={[on, toggle]}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  // Funcion que retorna el contexto y tira error si no está definido
  const context = React.useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

function ToggleOn({children}) {
  // Este hijo toma contexto del padre y usa el valor on
  const [on, _] = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  // Este hijo toma contexto del padre y usa el valor on
  const [on, _] = useToggle()
  return on ? null : children
}

function ToggleButton({props}) {
  const [on, toggle] = useToggle()
  // Este hijo toma contexto del padre y usa el valor on y el la funcion toggle
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// export default App

/*
eslint
  no-unused-vars: "off",
*/

// Esto no funciona porque no tiene contexto, va a tirar el error de useToggle
// const App = () => <ToggleButton />

export default App
