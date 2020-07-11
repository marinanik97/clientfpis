import React, { useState, useEffect } from "react";
import "./style/CreateType.css";
import {Redirect, useLocation} from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl, InputLabel, Button} from "@material-ui/core";




const Card = (navigation) => {
  const [cards, setCards] = React.useState([]);
  const [getRedirect, setRedirect] = useState();
  const [getOption, setOption] = useState();
  const location = useLocation();

 

  const getCards = () => {
    fetch("http://localhost:9000/kartoni")
      .then((response) => response.json())
      .then((response) => setCards(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCards();
  }, []);

  if(getRedirect){
    return <Redirect to={{
      pathname: getRedirect,
      state: { from: {kartonid: getOption} },
    }}/>
  }

  const renderCards = () => {
    if (cards) {
      return cards.map((card, index) => {
        return (
          <MenuItem  key={index + "|"} value={card.kartonid}>
            {card.ime + " " + card.prezime}
          </MenuItem >
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  const submit = (e) =>{
    e.preventDefault();
    setRedirect(`/report`);
  }

  const test = (event)=>{
    setOption(event.target.value)
 }
  console.log(cards);

  return (
    <div>
      <form className="form-create-type">
        <div className="div-form1">
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Ime i prezime</InputLabel>
          <Select
           onChange={test}
           placeholder="Pick"
             >
            {renderCards()}
          </Select>
          </FormControl>
          <Button
              onClick={submit}
              className="myButton"
              variant="contained"
              color="primary"
          >Dalje</Button>
        </div>
      </form>
      
    </div>
  );
};

export default Card;
