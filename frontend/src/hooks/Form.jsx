import { useState } from "react"



export const useForm = (iniState) => {
    const [state, setState] = useState(iniState)
    const onChange = e => {
        setState({...state,[e.target.name]:e.target.value})
      }
      return {
        state,
        onChange
      }
}