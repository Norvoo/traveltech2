import Nav from "./Components/Navbar/NavBar.js";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
function TestUpdate(props) {
  console.warn("props", props.match.params.id);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setFile] = useState("");
  const [description, setDescription] = useState("");
  useEffect(async () => {
    let result = await fetch(
      "http://192.168.0.111/traveltech/api/company/companystory/" +
        props.match.params.id
    );
    result = await result.json();
    setData(result);
    setName(result.name);
    setDescription(result.description);
    setFile(result.imageFile);
  }, []);

  async function editTest(id) {
    const formData = new FormData();
    formData.append("Id", props.match.params.id);
    formData.append("imageFile", imageFile);
    formData.append("name", name);
    formData.append("description", description);
    let result = await fetch(
      "http://192.168.0.111/traveltech/api/company/companystory/" +
        id +
        "?_method=PUT",
      {
        method: "Put",
        body: formData,
      }
    );
    alert("data saved");
  }
  return (
    <div>
      <Nav />
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        defaultValue={data.name}
      />
      <br />
      <textarea
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={data.description}
      />
      <br />
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        defaultValue={data.image}
      />
      <img
        className="img-size"
        style={{ width: 100 }}
        src={"http://192.168.0.111/traveltech/wwwroot/Images/" + data.image}
      />
      <button onClick={() => editTest(data.id)}>edit</button>
    </div>
  );
}
export default withRouter(TestUpdate);
