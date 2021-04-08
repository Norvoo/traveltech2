import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
function TestUpdate(props) {
  console.warn("props", props.match.params.id);
  const [data, setData] = useState([]);
  const [imageFile, setFile] = useState("");
  const [menus, setMenu] = useState("");
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/head");
    result = await result.json();
    setData(result);
    setFile(result.imageFile);
    setMenu(result.menus);
  }, []);
  async function editTest(id) {
    const formData = new FormData();
    formData.append("Id", props.match.params.id);
    formData.append("imageFile", imageFile);
    formData.append("menus", menus);
    let result = await fetch(
      "http://192.168.0.111/traveltech2/api/app/head/" + id + "?_method=PUT",
      {
        method: "Put",
        body: formData,
      }
    );
    alert("data saved");
  }
  return (
    <div>
      <br />
      <br />
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        defaultValue={data.imageName}
      />
      <img
        className="img-size"
        style={{ width: 100 }}
        src={
          "http://192.168.0.111/traveltech2/wwwroot/Images/" + data.imageName
        }
      />
      <input type="hidden" value={menus} name="menus" />
      <button onClick={() => editTest(data.id)}>edit</button>
    </div>
  );
}
export default withRouter(TestUpdate);
