import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
function TestUpdate() {
  const [data, setData] = useState([]);
  const [imageFile, setFile] = useState("");
  const [menus, setMenu] = useState("");
  const [id, setId] = useState(null);
  useEffect(async () => {
    gethead();
  }, []);
  function gethead() {
    fetch("http://192.168.0.109/travel/api/app/head").then((result) => {
      result.json().then((resp) => {
        setData(resp);
        setFile(resp.imageFile);
        setMenu(resp.menus);
        setId(resp.id);
      });
    });
  }
  function editTest() {
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("imageFile", imageFile);
    formData.append("menus", menus);
    fetch("http://192.168.0.109/travel/api/app/head/" + id + "?_method=PUT", {
      method: "Put",
      body: formData,
    }).then((result) => {
      result.json().then((resp) => {
        gethead();
      });
    });
    alert("data saved");
  }
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  return (
    <div className="headLogo">
      <br />
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        defaultValue={data.imageName}
      />
      <img
        className="img-size"
        style={{ width: 100 }}
        src={"http://192.168.0.109/travel/wwwroot/Images/" + data.imageName}
      />
      <input type="hidden" value={menus || ""} name="menus" />
      <br />
      <br />
      <MyButton onClick={() => editTest(data.id)}>Update logo</MyButton>
    </div>
  );
}
export default withRouter(TestUpdate);
