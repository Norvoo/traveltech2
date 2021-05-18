import React, { useState } from "react";
import { jsonDataPost } from "../helper";
export default function AddPage() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [author, setAuthor] = useState("");
  const [sections, setSectoin] = useState([]);
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { title, text, email, author, sections };
    jsonDataPost(partner, "http://192.168.0.109/travelNew/api/pages").then(
      () => {
        console.log("new Link");
      }
    );
    alert("new Menu");
  };
  return (
    <div className="add-item">
      <h1>Add page</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <br />

          <>
            <input
              type="text"
              required
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="title"
            />
          </>
          <br />
          <>
            <textarea
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="text"
              placeholder="text"
            />
          </>
          <br />
          <>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
            />
          </>
          <br />
          <>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              name="author"
              placeholder="author"
            />
          </>

          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
