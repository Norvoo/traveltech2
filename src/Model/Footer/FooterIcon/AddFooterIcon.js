// import React, { useState, useEffect } from "react";
// import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// const AddFooterMenu = () => {
//   const [Appdata, setAppData] = useState([]);
//   const [footerID, setFooterId] = useState(null);
//   useEffect(async () => {
//     let result = await fetch("http://192.168.0.109/travel/api/app");
//     result = await result.json();
//     console.log(result);
//     setFooterId(result["footerID"]);
//     setAppData(result);
//   }, []);

//   const [name, setName] = useState("");
//   const [links, setLin] = useState([]);
//   const getValue = (e) => {
//     let datalink = links;
//     datalink.push({ id: parseInt(e.target.value) });
//     setLin(datalink);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const partner = { name, footerID, links };

//     fetch("http://192.168.0.109/travel/api/app/menuItems", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(partner),
//     }).then(() => {
//       console.log("new Footer Menu ");
//     });
//     alert("data saved");
//   };
//   const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 200,
//       fontSize: "1rem",
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

//   const classes = useStyles();

//   return (
//     <div>
//       <h1>Add Drop</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="col-sm-6 offset-sm-4">
//           <br />
//           <input
//             type="text"
//             required
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             name="name"
//             placeholder="Footer Menu Title"
//           />

//           <br />
//           <input
//             type="file"
//             name="imageFile"
//             className="form-control"
//             onChange={(e) => setFile(e.target.files[0])}
//             placeholder="file"
//           />
//           <br />
//           <input
//             type="hidden"
//             required
//             className="form-control"
//             value={footerID}
//             name="footerID"
//           />
//           <br />
//           <button type="submit">Add FooterMenu</button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default AddFooterMenu;
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "../../../App.css";
const AddFooterIcon = () => {
  const [imageFile, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [Appdata, setAppData] = useState([]);
  const [footerID, setFooterId] = useState(null);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app");
    result = await result.json();
    console.log(result);
    setFooterId(result["footerID"]);
    setAppData(result);
  }, []);
  async function createFooterIcon() {
    console.warn(imageFile, url, footerID);
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("url", url);

    formData.append("footerID", footerID);
    let result = await fetch(
      "http://192.168.0.109/travel/api/app/footericons",
      {
        method: "POST",
        body: formData,
      }
    );
    alert("data saved");
  }
  return (
    <div className="add-item">
      <div className="col-sm-6 offset-sm-4">
        <br />

        <input
          type="text"
          value={url || ""}
          className="form-control"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="url"
        />
        <br />
        <input
          type="hidden"
          className="form-control"
          name="footerID"
          value={footerID || ""}
        />
        <br />
        <input
          type="file"
          name="imageFile"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          placeholder="file"
        />
        <br />
        <Button variant="contained" color="primary" onClick={createFooterIcon}>
          Add
        </Button>
      </div>
    </div>
  );
};
export default AddFooterIcon;
