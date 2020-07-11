import React, { useState, useEffect } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {formatDate} from '../utils/utlis';
import toast from '../utils/toast'




const CreateType = () => {
  const [posiljalac, setPosiljalac] = useState("");
  const [uzorakid, setUzorakId] = useState(0);
  const [rezultatid, setRezultatid] = useState(0);
  const [tipovi, setTipovi] = React.useState([]);
  const [rezultati, setRezultati] = React.useState([]);
  const [datumupisa, setDatumupisa] = useState(new Date());
  const [rezultatBrisanje, setRezultatBrisanje] = useState([]);
  const [getUzorak, setUzorak] = useState();
  const [error, setError] = useState();


  const sendRez =  (event) => {
  event.preventDefault();

    const uzorak = tipovi.find((tip) => tip.uzorakid == getUzorak);

    if(!posiljalac || !datumupisa || !uzorak){
      setError(true);
      return;
    }
    const rezObj = {
      posiljalac: posiljalac,
      datumupisa: formatDate(datumupisa),
      uzorakid: uzorak.uzorakid,
    };


    fetch("http://localhost:9000/addrezultat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rezObj),
    })
      .then( (res) => {
        if (res.status == 400) {

          return res.json();
        }
        if (res.ok) {
          getRezultati();
          toast.success("Rezultat je sačuvan");
        } else {
        }
      })
      .catch((e) => {
      });
  };

  const [columns, setColumns] = useState([
    { title: "RezultatID", field: "rezultatid", editable: 'never' },
    { title: "Posiljalac", field: "posiljalac" },
    { title: "Datum upisa", field: "datumupisa", editable: 'never' },
  ]);

  const getTipovi = () => {
    fetch("http://localhost:9000/uzorci")
      .then((response) => response.json())
      .then((response) => setTipovi(response))
      .catch((err) => console.error(err));
  };

  const getRezultati = () => {
    fetch("http://localhost:9000/rezultati")
      .then((response) => response.json())
      .then((response) => setRezultati(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTipovi();
    getRezultati();
  }, []);

  const deleteRezultat = (rezultatid, callback) =>{
    fetch("http://localhost:9000/brisanjerezultata/" + rezultatid)
        .then(() => callback())
        .then(() => toast.success("Uspešno obrisano"))
        .catch((err) => toast.error("Greška"));
  }
  const updateRezultat = (rezultatid, newData, callback) =>{
    fetch("http://localhost:9000/izmenarezultata/" + rezultatid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
        .then(async (res) => {
          if (res.status == 400) {
            return res.json();
          }
          if (res.ok) {
            toast.success("Uspešno promenjeno")
            getRezultati();
          } else {
          toast.error("Greška");
          }
        })
        .catch((e) => {
          toast.error("Greška");
        });
  }
  const renderTipovi = () => {
    if (tipovi) {
      return tipovi.map((tip, index) => {
        return (
          <MenuItem key={index + "|"} value={tip.uzorakid}>
            {tip.ime + " " + tip.prezime}
          </MenuItem>
        );

      });
    } else {
      return <option>test</option>;
    }
  };

  const changeUzorak = (e) =>{
    setError(false)
    setUzorak(e.target.value);
  }


  return (
    <div>
      <form className="form-create-type">
        <div className="div-form">
          <TextField
              error={error}
              label={"Pošiljalac"}
            type="text"
            value={posiljalac}
            onChange={(e) => {
              setError(false)
              setPosiljalac(e.target.value)
            }}
          />
          {/* <label>Ime i prezime pacijenta: </label> */}
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Ime i prezime</InputLabel>
          <Select              error={error}
                               labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={changeUzorak}
          >{renderTipovi()}</Select>
          {/* <label>Datum upisa:</label> */}
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker              error={error}

                                           value={datumupisa}
            onChange={(datumupisa) => {
              setError(false)
              setDatumupisa(datumupisa)
            }}

          />
          </MuiPickersUtilsProvider>
          {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} setOpen={true}/> */}
          <div className="buttonsEdit">
            <Button
                variant="contained"
                color="primary"
              className="myButton"
              onClick={(event) => sendRez(event,{ posiljalac, datumupisa, uzorakid })}
            >
              Dodaj
            </Button>
          </div>
        </div>
      </form>
      <MaterialTable
          title={"Rezultati"}
        columns={columns}
        data={rezultati}
        editable={{
          onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  updateRezultat(oldData.rezultatid,newData);
                  resolve();
                }, 1000);
              }),
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteRezultat(oldData.rezultatid, () =>{
                  getRezultati()
                  resolve();

                })

              }, 1000);
            })}}}
      />
    </div>
  );
};

export default CreateType;
