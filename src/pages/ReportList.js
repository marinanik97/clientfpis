import React, {useEffect, useState} from "react";
import "./style/CreateReport.css";
import MaterialTable from "material-table";
import {refromatDate} from "../utils/utlis.js";
import toast from '../utils/toast'




export default function ReportList(){
    const [getIzvestaji, setIzvestaji] = useState([]);

    const fetchIzvestaji = () => {
        fetch("http://localhost:9000/izvestaji")
            .then((response) => response.json())
            .then((response) => setIzvestaji(response))
            .catch((err) => console.error(err));
    };

    const deleteIzvestaj = (izvestajId, callback) =>{
        fetch("http://localhost:9000/delete_izvestaj/" + izvestajId)
            .then(() => callback())
            .then(() => toast.success("Uspešno obrisano"))
            .catch((err) => toast.error("Greška"));
    }


    useEffect(() =>{
        fetchIzvestaji()
    },[])



    return (
        <MaterialTable
            title={"Izveštaji"}
            columns={[
                {
                    title: 'Pacijent',
                    render: (rowData) => {
                        if(rowData.kartonIme && rowData.kartonPrezime){
                            return <span>{`${rowData.kartonIme} ${rowData.kartonPrezime}`}</span>
                        }
                    }
                },
                {
                    title: 'Doktor',
                    render: (rowData) => {
                        if(rowData.doktorIme && rowData.doktorPrezime){
                            return <span>{`${rowData.doktorIme} ${rowData.doktorPrezime}`}</span>
                        }
                    }
                },
                {
                    title: 'Specijalnost doktora',
                    field: 'specijalnost'
                },
                {
                    title: 'Datum stampanja',
                    field: 'datumstampanja'
                },
                {
                    field: 'napomena',
                    title: 'Napomena'
                }
            ]}

            editable={{
                onRowDelete: (oldData) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteIzvestaj(oldData.izvestajid, () =>{
                                fetchIzvestaji()
                                resolve();

                            })

                        }, 1000);
            })}}}
        data={getIzvestaji}
        />
    )
}

