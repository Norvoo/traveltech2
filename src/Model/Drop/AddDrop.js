import { useState } from "react";
const AddPartner = () => {
  const [name, setName] = useState("");
  const [url, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, url };

    fetch("http://192.168.0.111/traveltech2/api/app/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new partner");
    });
    alert("data saved");
  };
  return (
    <div>
      <h1>Add Drop</h1>
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
            placeholder="Partners"
          />
          <br />
          <input
            type="text"
            required
            className="form-control"
            value={url}
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
export default AddPartner;
