const Legend = () => {
  return (
    <div className="flex flex-row items-center justify-between px-1 mr-2">
      <div>
        <div className="h-3 w-3 border border-[#908f8f] bg-[#ff00ff] mx-1 inline-block"></div>
        <p className="inline-block">Server</p>
      </div>
      <div>
        <div className="h-3 w-3 border border-[#908f8f] bg-[#77db89] ml-2 mr-1 inline-block"></div>
        <p className="inline-block">Client</p>
      </div>
    </div>
  )
}

export default Legend
