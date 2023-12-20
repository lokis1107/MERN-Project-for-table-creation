import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8080/";

const App = () => {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setActive(false);
      alert(data.data.message);
    }
    console.log(data);
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setData(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-1 items-center justify-center mt-10 p-2 mx-60 rounded-xl">
          <div className="mt-5  border rounded-lg p-3">
            <button
              onClick={() => setActive(true)}
              className=" text-lg font-bold text-gray-900"
            >
              Add
            </button>
          </div>
          {active && (
            <div className=" mt-36 border space-y-5 p-5 w-96 ml-36">
              <div className=" flex-col flex">
                <label>Name</label>
                <input
                  className="p-2 border rounded-md"
                  placeholder="Enter your name"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className=" flex-col flex">
                <label>Email</label>
                <input
                  className="p-2 border rounded-md"
                  placeholder="Enter your mail address"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className=" flex-col flex">
                <label>Mobile Number</label>
                <input
                  className="p-2 border rounded-md"
                  placeholder="Enter your mobile number"
                  name="mobile"
                  onChange={handleChange}
                />
              </div>
              <div className="p-2 mx-4">
                <button
                  onClick={handleSubmit}
                  className="text-center ml-28 font-bold text-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 ml-32 mb-20">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>
                  <button className="ml-3 bg-yellow-400 p-1 w-20 rounded-lg text-white mt-2 mb-2">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="ml-3 bg-red-500 p-1 w-20 rounded-lg text-white mt-2 mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
