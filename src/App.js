import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return <MyComponent />;
}

function MyComponent() {
  const [username, setusername] = useState("");
  const [list, setList] = useState([]);

  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  const addUser = async () => {
    const url = "http://localhost:4000/add-user;";
    const data = {
      username: username,
    };

    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);
    setusername("");
  };

  const getUser1 = async () => {
    const url = "http://localhost:4000/user";
    const result = await axios.get(url);

    const list = result.data;
    const newList = [...list];
    setList(newList);
  };

  const getUser = async () => {
    const url = "http://localhost:4000/users";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };

  useEffect(() => getUser(), []);

  return (
    <div>
      <div>
        <h1 className=" bg-success  r-5  text-light m-5 p-2  ">
          {" "}
          My Chat App 019_Awesh Shaikh_JH{" "}
        </h1>
      </div>
      <div class="col">
        <input
          className="form-control form-control-lg mb-1 r-2 m-2"
          type="text"
          name=""
          id=""
          value={username}
          onChange={handleUsernameChange}
          placeholder="Type here...."
        />
      </div>
      <div>
        <input
          className=" btn m-2 btn-secondary p-f-100 r-5"
          type="button"
          value="Send"
          onClick={addUser}
        />
      </div>

      {list.map((item, index) => (
        <div key={index} className="alert alert-secondary fs-4">
          {item.username}
        </div>
      ))}
    </div>
  );
}
