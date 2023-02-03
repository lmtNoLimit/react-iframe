## Usage
Just simply wrap the components you need using Iframe component
```
import { Iframe } from '@lmtnolimit/react-iframe';

const MyComponent = () => {
  return (
    <div>Hello world</div> 
  )
}

const App = () => {
  const nodeRef = useRef()

  const head = (
    <>
      <link rel="stylesheet" href="/styles.css" />
      <title>Home</title>
    </>
  )

  return (
    <div className="App">
      <Iframe
        head={head}
        title={'Iframe Title'}
        className={''}
        onMount={() => {}}
        onUpdate={() => {}}
        ref={nodeRef}
      >
        <MyComponent>
      </Iframe>
    </div>
  )
}
```


To access Iframe window or document
```
import { useFrame } from '@lmtnolimit/react-iframe';

const MyComponent = () => {
  const { document: frameDocument, window: frameWindow } = useFrame();
  console.log(frameDocument, frameWindow)
  
  return (
    <div></div>
  )
}
```
