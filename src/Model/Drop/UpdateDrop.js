import React, { useEffect, useState } from "react";
function App() {
  const [menus, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);
  function getMenus() {
    fetch("http://192.168.0.111/traveltech2/api/app/menus").then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        // console.warn(resp)
        setMenu(resp);
        setName(resp[0].name);
        setUrl(resp[0].url);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.111/traveltech2/api/app/menus/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getMenus();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = menus.map((menu) => {
      if (menu.id == id) data = menu;
    });
    console.log(data);
    setName(data.name);
    setUrl(data.url);
    setId(data.id);
  }
  function updateMenu() {
    let item = { name, url, id };
    console.warn("item", item);
    fetch("http://192.168.0.111/traveltech2/api/app/menus/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getMenus();
      });
    });
  }
  return (
    <div className="App">
      <h1>Update User Data With API </h1>
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Patch</td>
          </tr>
          {menus.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.url}</td>

              <td>
                <button onClick={() => deleteMenu(item.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => seletMenu(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={updateMenu}>Update User</button>
      </div>
    </div>
  );
}
export default App;
