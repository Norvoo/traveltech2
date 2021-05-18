import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import { jsonDataPost } from "../../helper";
const AddUrl = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/menus");
    result = await result.json();
    setData(result);
  }, []);
  const [link, setLink] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/links");
    result = await result.json();
    console.log(result);
    setLink(result);
  }, []);
  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [menusID, setMenuId] = useState("");
  const [links, setLin] = useState([]);
  const getValue = (e) => {
    let datalink = links;
    datalink.push({ id: parseInt(e.target.value) });
    setLin(datalink);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, desc, menusID, links };
    jsonDataPost(partner, "http://192.168.0.109/travel/api/app/menuItems").then(
      () => {
        console.log("new Menu items");
      }
    );
    alert("data saved");
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      fontSize: "1rem",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div className="add-item">
      <h1>Add Drop</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select
            </InputLabel>
            <Select value={menusID} onChange={(e) => setMenuId(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <div>
            <input
              variant="outlined"
              type="text"
              required
              style={{ with: 180 }}
              className=" inpute"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Menu item"
            />
            <br />
          </div>
          <br />
          <div>
            <textarea
              type="text"
              required
              className="form-control"
              value={desc || ""}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Description"
            />

            <br />
          </div>

          {link.map((i) => {
            return (
              <div className="inputGrid">
                <input
                  key={i.id}
                  type="checkbox"
                  onChange={(e) => getValue(e)}
                  value={i.id || ""}
                />
                <label>{i.name}</label>
              </div>
            );
          })}
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddUrl;
// import React, { useState, useEffect } from "react";
// import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// const AddUrl = () => {
//   const [data, setData] = useState([]);
//   useEffect(async () => {
//     let result = await fetch("http://192.168.0.111/traveltech2/api/app/menus");
//     result = await result.json();
//     console.log(result);
//     setData(result);
//   }, []);
//   console.warn("data", data);
//   const [links, setLink] = useState([]);
//   useEffect(async () => {
//     let result = await fetch("http://192.168.0.111/traveltech2/api/app/links");
//     result = await result.json();
//     console.log(result);
//     setLink(result);
//   }, []);
//   console.warn("link", links);
//   const [name, setName] = useState("");
//   const [desc, setDescription] = useState("");
//   const [menuID, setMenuId] = useState("");
//   const [link, setLin] = useState([]);
//   const getValue = (e) => {
//     let datalink = link;
//     datalink.push({ id: parseInt(e.target.value) });
//     setLin(datalink);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const partner = { name, desc, menuID, link };

//     fetch("http://192.168.0.111/traveltech2/api/app/menuItems", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(partner),
//     }).then(() => {
//       console.log("new Drop");
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
//             placeholder="UrL Source"
//           />
//           <br />
//           <textarea
//             type="text"
//             required
//             className="form-control"
//             value={desc}
//             onChange={(e) => setDescription(e.target.value)}
//             name="description"
//             placeholder="Description"
//           />
//           <br />
//           <FormControl variant="outlined" className={classes.formControl}>
//             <Select value={menuID} onChange={(e) => setMenuId(e.target.value)}>
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               {data.map((item) => {
//                 return (
//                   <MenuItem key={item.id} value={item.id}>
//                     {item.name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           {links.map((i) => {
//             return (
//               <>
//                 <input
//                   key={i.id}
//                   type="checkbox"
//                   onChange={(e) => getValue(e)}
//                   value={i.id}
//                 />
//                 <label>{i.name}</label>
//               </>
//             );
//           })}
//           <br />
//           <button type="submit">Add</button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default AddUrl;
