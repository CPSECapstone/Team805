import React, { useState, useMemo } from "react";
import Button from '@material-ui/core/Button';
import { Renderer } from "./Renderer";
import { getJson } from "./exampleJson";

export const Form = () => {
  const [state, setState] = useState({ 
    firstName: "",
    lastName: "",
    email: "", 
    password: "", 
    gender: "",
  });

  const handleSubmit = e => {
     e.preventDefault(); 
     console.log("state", state);
  }

   const handleOnChange = field => event => {
      const { value } = event.target; 
      setState(prevState => ({  ...prevState,  [field]: value  }));
   }

   const config = useMemo(() => { 
     return getJson({ state,  onChange: handleOnChange  });  
   }, [state]);

   return (     
     <form onSubmit={handleSubmit}>     
        <Renderer config={config} />      
        <Button type="submit" variant="contained">Submit</Button>    
     </form> 
   );
}
export default Form;