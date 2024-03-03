import { useState } from "react";
import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";

function App() {

  const URL = import.meta.env.VITE_URL

  const [sent, setSent] = useState(false);

  const [redirectURL, setRedirectURL] = useState("")
  const [shortenedURL, setShortenedURL] = useState("")
  
  const options = ["localhost:8000/"]

  const [open, setOpen] = useState(false)
  const [option, setOption] = useState(options[0])
  const [filled, setFilled] = useState(false)


  const handlePOST = async (e) => {
    e.preventDefault()
    setRedirectURL(e.target[0].value)
    fetch(URL+"url",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        redirectURL: e.target[0].value
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data)
      if(data.message==="Created"){
        setShortenedURL(data.id)
        setSent(true)
      }
      else{
        setFilled(true)
      }
    })
  }

  return (
    !sent?<InputBox setOpen={setOpen} open={open} setOption={setOption} option={option} options={options} handlePOST={handlePOST} filled={filled}/>:<OutputBox shortenedURL={shortenedURL} redirectURL={redirectURL} setSent={setSent} setFilled={setFilled}/>
  )
}

export default App