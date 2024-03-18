import React from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Storage/Storage";
import { editContact, setContactInStorage } from "../Storage/Storage";

export default function Import() {
  const navigate = useNavigate();
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId !== null ? sessionData.userId : null;

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      complete: function (result) {
        const data = [];
        result.data.map((d) => {
          return data.push({
            name: d[2],
            email: d[1],
            phone: d[0],
            Avatar: d[3],
            userId: d[4],
          });
        });
        data.shift();
        const contacts = editContact([activeUser]);
        data.map((d) => {
          return contacts.push(d);
        });
        setContactInStorage([activeUser], contacts);
        navigate("/home/viewcontact");
      },
    });
  };

  return (
    <div className="App">
      <h3>
        Please upload the <span className="csv">.CSV</span> file to import
      </h3>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFile}
      ></input>
    </div>
  );
}
