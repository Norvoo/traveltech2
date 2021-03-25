import { useState } from "react";
const AddUrl = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, description };

    fetch("http://192.168.0.111/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Url");
    });
    alert("data saved");
  };
  return (
    <div>
      <h1>Add Url</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <br />
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="UrL Source"
          />
          <br />
          <textarea
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
          />
          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddUrl;
