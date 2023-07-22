const Legend = () => {
  return (
    <div className="flex flex-row items-center px-1 mr-2">
      <div className="h-3 w-3 border border-[#908f8f] bg-[#ff00ff] mx-1"></div>
      <p>Server</p>
      <div className="h-3 w-3 border border-[#908f8f] bg-[#77db89] ml-2 mr-1"></div>
      <p>Client</p>
    </div>
  )
}

export default Legend
