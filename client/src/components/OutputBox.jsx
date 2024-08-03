/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import link from "/link.png";
import wand from "/wand.png";
import open from "/open.png";
import openwhite from "/openwhite.png";
import qr from "/qr-code.png"
import copy from "/copy.png"
import { useEffect, useState } from "react";

function OutputBox({shortenedURL, redirectURL, setSent, setFilled}) {
  const URL = import.meta.env.VITE_URL
  const [o1, setO1] = useState(false)
  const [o2, setO2] = useState(false)
  const [c2, setC2] = useState(false)
  const [o3, setO3] = useState(false)
  const [dummy, setDummy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imageqr, setImageqr] = useState("")

  async function downloadImage(
    imageSrc,
    nameOfDownload = 'qr-code.png',
  ) {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;
  
    document.body.appendChild(anchorElement);
    anchorElement.click();
  
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  useEffect(()=>{
    setImageqr("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+URL+shortenedURL)
  },[])

  return (
    <div onClick={()=>{
      setC2(false)
    }} className="bg-[#001E37] h-screen text-white select-none">
      <header className="flex justify-between py-5 px-10">
        <section>
          <h1 className="sm:text-4xl text-2xl rrkabel">URL<br/>Shortener</h1>
        </section>
        <section>
          <ul className="bg-[#066486] flex justify-center items-center rounded-md">
            <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">Home</li>
            <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">Shorten</li>
            <li className="w-full h-full rounded-md cursor-pointer hover:bg-[#0D97B7] px-3 py-3">MyURLs</li>
          </ul>
        </section>
      </header>
      <section className="flex flex-col justify-center items-center mx-5">
        <div className={`my-5 px-4 py-2 bg-[#1B1E1F] w-[420px] sm:w-full lg:w-[600px]  border-2 border-solid border-[#414141] rounded-xl h-[60vh] ubuntu-regular flex flex-col justify-center items-center`}>
          <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="w-full h-full flex flex-col">
              <span className="flex flex-row items-center h-full text-gray-400"><img src={link} alt="link"/>&nbsp;&nbsp;Your Long URL</span>
              <input readOnly className={`bg-transparent text-[#7BDFA0] text-xl border-2 border-solid  border-[#414141] rounded-md w-full px-3 h-full`} value={redirectURL}/>
            </div>
            <div className="w-full h-full flex flex-col">
              <span className="flex flex-row items-center h-full text-gray-400"><img src={wand} alt="wand"/>&nbsp;&nbsp;Shortened URL</span>
              <input readOnly className={`bg-transparent text-[#7BDFA0] text-xl border-2 border-solid  border-[#414141] rounded-md w-full px-3 h-full`} value={URL+shortenedURL}/>
            </div>
            <div className="w-full h-full flex items-center justify-start gap-2">
              <button onClick={()=>{
                window.open(URL+shortenedURL)
              }} onMouseEnter={()=>{
                  setO1(true)
                }} onMouseLeave={()=>{
                    setO1(false)
                  }} className="bg-transparent border-2 border-solid border-[#0D97B7] px-4 py-2 rounded-md h-[40px] w-[60px] duration-100 hover:bg-[#066486] relative"><img className="h-full w-full object-contain" src={(o1?openwhite:open)} alt="open"/>
                <div className={`absolute bg-[#066486] ${o1?"block":"hidden"} bottom-0 left-[-2px] translate-y-[120%] h-[40px] w-[90px] flex justify-center items-center rounded-md`}>Visit URL</div>
              </button>
              <button onClick={async(e)=>{
                e.stopPropagation()
                setC2(!c2)
              }} onMouseEnter={()=>{
                  if(dummy){
                    return
                  }
                  setO2(true)
                }} onMouseLeave={()=>{
                    setO2(false)
                  }} className={`flex items-center justify-between bg-[#066486] duration-100 h-[40px] w-[60px] sm:w-[97px] px-4 py-2 border-2 border-solid border-[#0D97B7] rounded-md ${dummy?"":"hover:bg-[#064F64]"} relative`}><img className="h-full w-full object-contain" src={qr} alt="qr"/><span className="w-full hidden sm:block">QR</span>
                    <div className={`absolute bg-[#066486] ${o2?"block":"hidden"} bottom-0 left-[-2px] translate-y-[120%] h-[40px] w-[97px] flex justify-center items-center rounded-md`}>QR Code</div>
                    <div onMouseOver={()=>{
                      setDummy(true)
                    }} onMouseLeave={()=>{
                      setDummy(false)
                    }} className={`absolute bg-[#066486] ${c2?"block":"hidden"} bottom-0 left-[-2px] translate-y-[104%] h-[220px] z-10 flex flex-col justify-center items-center rounded-md bg-[#181A1B] border-2 border-solid border-[#414141] p-3 min-h-max w-max`}>
                      <img src={imageqr}/>
                      <button onClick={()=>{
                        downloadImage(imageqr+".jpg", "qr-code.png")
                      }} className="bg-[#196836] border-[#2fb25f] border-2 border-solid hover:bg-[#134F2A] w-full rounded-md duration-150 mt-3 h-full">Download PNG</button>
                    </div>
                  </button>
              <button onClick={()=>{
                navigator.clipboard.writeText(URL+shortenedURL)
                setCopied(true)
              }} onMouseEnter={()=>{
                  setO3(true)
                }} onMouseLeave={()=>{
                    setO3(false)
                    setCopied(false)
                  }} className="flex items-center justify-between bg-[#196836] duration-100 h-[40px] w-[60px] sm:w-[110px] px-4 py-2 border-2 border-solid border-[#2fb25f] rounded-md hover:bg-[#134F2A] relative"><img className="h-full w-full object-contain" src={copy} alt="copy"/><span className="w-full hidden sm:block">COPY</span>
                    <div className={`absolute bg-[#066486] ${o3?"block":"hidden"} bottom-0 right-[-2px] translate-y-[120%] h-[40px] w-[149px] flex justify-center items-center rounded-md duration-200`}>{copied?"Copied !":"Copy to Clipboard"}</div>
              </button>
            </div>
          </div>
          <div className="h-1/4 w-full flex justify-center items-center pb-3 gap-4">
            <button className="bg-transparent hover:bg-[#196836] border-2 border-solid border-[#2fb25f] w-full h-full rounded-xl text-[#2fb25f] hover:text-white font-extrabold duration-150">My URLs</button>
            <button onClick={()=>{
              setSent(false)
              setFilled(false)
            }} className="bg-[#196836] border-[#2fb25f] border-2 border-solid hover:bg-[#134F2A] w-full h-full rounded-xl font-extrabold duration-150" >Shorten Another</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OutputBox