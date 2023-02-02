import ReactDOM from 'react-dom'
import React, { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react'
import { omit } from '../../utils/omit'

let doc
let win
if (typeof document !== 'undefined') {
  doc = document
}
if (typeof window !== 'undefined') {
  win = window
}

export const FrameContext = React.createContext({ document: doc, window: win })

export const useFrame = () => React.useContext(FrameContext)

interface IframeProps extends HTMLProps<HTMLIFrameElement> {
  head?: React.ReactNode
  mountTarget?: any
  onMount: () => void
  onUpdate: () => void
  initialContent?: string
}

interface IframeContentProps extends HTMLProps<any> {
  onMount: () => void
  onUpdate: () => void
}

const IframeContent = (props: IframeContentProps) => {
  const { children, onMount, onUpdate } = props

  useEffect(() => {
    onMount()
  }, [])

  useEffect(() => {
    onUpdate()
  })

  return <>{children}</>
}

const Iframe = forwardRef((props: IframeProps, ref: React.ForwardedRef<HTMLIFrameElement>) => {
  const {
    style = {},
    head = null,
    children = undefined,
    mountTarget = undefined,
    onMount = () => {},
    onUpdate = () => {},
    initialContent = '<!DOCTYPE html><html><head></head><body></body></html>',
  } = props

  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void
  const [mounted, setMounted] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const nodeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    setMounted(true)
    const doc = getDoc()
    if (doc && doc.readyState === 'complete') {
      forceUpdate()
    } else {
      nodeRef.current?.addEventListener('load', handleLoad)
    }

    return () => {
      nodeRef.current?.removeEventListener('load', handleLoad)
    }
  }, [])

  const getDoc = () => {
    return nodeRef.current ? nodeRef.current.contentDocument : null
  }

  const getMountTarget = () => {
    const doc = getDoc()
    if (mountTarget) {
      return doc?.querySelector(mountTarget)
    }
    return doc?.body
  }

  const setRef = (node: HTMLIFrameElement | null) => {
    nodeRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const handleLoad = () => {
    setIframeLoaded(true)
  }

  function renderFrameContents() {
    if (!mounted) {
      return null
    }

    const doc = getDoc()
    if (!doc) {
      return null
    }

    const win = doc.defaultView || undefined
    const contents = (
      <IframeContent onMount={onMount} onUpdate={onUpdate}>
        <FrameContext.Provider value={{ document: doc, window: win }}>{children}</FrameContext.Provider>
      </IframeContent>
    )

    const mountTarget = getMountTarget()

    return [ReactDOM.createPortal(head, doc.head), ReactDOM.createPortal(contents, mountTarget)]
  }

  const extendProps = {
    ...props,
    srcDoc: initialContent,
    children: undefined,
  }

  const restProps = omit(extendProps, ['head', 'initialContent', 'mountTarget', 'onMount', 'onUpdate'])

  return (
    <iframe
      sandbox={'allow-same-origin allow-scripts allow-top-navigation'}
      ref={setRef}
      {...restProps}
      onLoad={handleLoad}
    >
      {iframeLoaded && renderFrameContents()}
    </iframe>
  )
})

export default Iframe
