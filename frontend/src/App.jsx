import './App.css'
import { Button, MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Button>SecureCorp</Button>
    </MantineProvider>
  )
}

export default App
