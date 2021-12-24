import React from 'react'
import { useMyHook } from 'use-react-form-validate'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App