/* eslint-disable react/prop-types */
import link from "/link.png";
import wand from "/wand.png";
import down from "/down.png";

function InputBox({setOpen, open, option, setOption, options, handlePOST, filled}) {
  return (
    <div onClick={()=>{
        setOpen(false)
      }} className="bg-[#001E37] h-screen text-white select-none">
        <header className="flex justify-between py-5 sm:px-10 px-5">
          <section>
            <h1 className="sm:text-4xl text-2xl rrkabel">URL<br/>Shortener</h1>
          </section>
          <section className="sm:text-xl sm:font-bold text-xs">
            <ul className="bg-[#066486] flex justify-center items-center rounded-md">
              <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">Home</li>
              <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">Shorten</li>
              <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">MyURLs</li>
            </ul>
          </section>
        </header>
        <section className="flex flex-col justify-center items-center mx-5">
          <div className={`my-5 px-4 py-2 bg-[#1B1E1F] w-[320px] sm:w-full lg:w-[600px]  border-2 border-solid border-[#414141] rounded-xl ${!filled?"h-[60vh]":"h-[68vh]"} ubuntu-regular `}>
            <form className="w-full h-full flex flex-col" onSubmit={handlePOST}>
              <div className="flex flex-col h-full pb-5">
                <div className="w-full h-full flex flex-col">
                  <span className="flex flex-row items-center h-full text-gray-400"><img src={link} alt="link"/>&nbsp;&nbsp;Shorten a long URL</span>
                  <input className={`bg-transparent border-2 border-solid ${!filled?"border-[#414141]":"border-red-700 focus:border-red-700 outline-none"} rounded-md w-full px-3 h-full text-xl`} type="text" placeholder="Enter a long URL here"/>
                </div>
                <div className={`px-1 pt-2 ${filled?"text-red-700 block":"hidden"}`}>The URL field is required.</div>
                <div className="w-full h-full flex flex-col relative">
                  <span className="flex flex-row items-center h-full text-gray-400"><img src={wand} alt="wand"/>&nbsp;&nbsp;Customize your link</span>
                  <section onClick={(e)=>{
                    setOpen(!open)
                    e.stopPropagation()
                  }} className={`bg-transparent border-2 border-solid ${!open?"border-[#414141]":"border-[#a4a4a4]"} rounded-md w-full px-3 h-full flex justify-between cursor-pointer items-center text-xl`}>
                    {option}
                    <img className={`${!open?"down-arrow-png":"up-arrow-png"}`} src={down} alt="down arrow"/>
                  </section>
                  <div className={`${!open?" hidden":" flex"} w-full h-max`}>
                    <ul className="absolute w-full border-[2px] border-solid border-[#414141] bg-[#1B1E1F] py-1 rounded-md h-max max-h-[300px] overflow-y-scroll no-scrollbar">
                      {options.map((option,index)=>{
                        return <li key={index} onClick={()=>{
                          setOption(option)
                          setOpen(false)
                        }} className="bg-[#1B1E1F] hover:bg-[#043C96] cursor-pointer px-2 h-[50px] flex items-center">{option}</li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="h-1/4 sm:mt-0 sm:h-1/3 w-full flex justify-center items-center pb-3">
                <button className="bg-[#1E8143] w-full h-full rounded-md border-2 border-solid border-[#2fb25f] text-2xl font-bold hover:bg-[#196836]">Shorten URL</button>
              </div>
            </form>
          </div>
        </section>
      </div>
  )
}

export default InputBox