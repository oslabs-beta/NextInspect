import React from 'react'

export default function App() {
  const eventSource = new EventSource('http://localhost:3002/stream/sse');
  eventSource.onmessage = (e) => {
    console.log(e.data)
  }

  return (
    <>
      <p>App connected</p>
    </>
  )
}
