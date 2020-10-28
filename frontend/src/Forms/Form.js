import React, { useState, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Renderer } from './Renderer';
import { getJson } from './exampleJson';

export const Form = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`A form was submitted: \n${state.firstName}\n${+state.lastName}\n${state.email}\n${state.password}\n${state.gender}`);
  };

  const handleOnChange = field => event => {
    const { value } = event.target; 
    console.log(event.target);
    setState(prevState => ({  ...prevState,  [field]: value  }));
  };

  const config = useMemo(() => {
    return getJson({ state,  onChange: handleOnChange  });  
  }, [state]);

  return (
    <Grid 
    container 
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
    >
    <Grid item xs={12}>
    <form onSubmit={handleSubmit}>
      <Renderer config={config} />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
    </Grid>

    </Grid>
  );
};
export default Form;
