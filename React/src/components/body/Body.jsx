import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Body.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsXSquareFill, BsPencilSquare } from "react-icons/bs";
export default function Body() {
  const [todo, setTodo] = useState({
    name: "",
  });
  const [flag, setFlag] = useState(false);
  const [allTodo, setAllTodo] = useState([]);

  const handleGetTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/todos");
      setAllTodo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetTodos();
  }, [flag]);
  //them
  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/todos",
        todo
      );
      setAllTodo(response.data.todos);
      setFlag(!flag);
      setTodo({ name: "" });
    } catch (error) {
      console.error(error);
    }
  };
  //xoa
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this todo?")) {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/todos/${id}`
        );
        //   setAllTodo(response.data);
        setFlag(!flag);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // thay doi status
  const handleChangeStatus = async (e) => {
    console.log(e);
    try {
      if (confirm("Are you sure you want to change status this todo?")) {
        const response = await axios.put(
          `http://localhost:3000/api/v1/todos/${e.id}`
        );
        setAllTodo(response.data.todos);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="body">
        <div id="formTable">
          <div className="mainTable">
            <h1>Todo App</h1>
            <div className="formAdd">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Add new todo"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="name"
                  onChange={(e) =>
                    setTodo({ ...todo, [e.target.name]: e.target.value })
                  }
                  value={todo.name}
                />
                <Button
                  style={{
                    backgroundColor: "rgb(139,74,236)",
                    fontSize: "15px",
                    fontWeight: "900",
                    width: "50px",
                  }}
                  id="button-addon2"
                  onClick={handleAddTodo}
                >
                  Add
                </Button>
              </InputGroup>
            </div>
            <div className="formRender">
              {allTodo?.map((e, i) => {
                return (
                  <ul key={i}>
                    <li className="formRender__list">
                      <p className="formRender__list--text">{e.name}</p>
                      <div className="formRender__list--button">
                        <Button
                          style={{
                            fontSize: "17px",
                            fontWeight: "900",
                            width: "100px",
                            textAlign: "center",
                            border: "none",
                            backgroundColor: `${
                              e.status === 0 ? "green" : "red"
                            }`,
                          }}
                          id="button-addon2"
                          onClick={() => handleChangeStatus(e)}
                          disabled={e.status === 0 ? false : true}
                        >
                          {e.status === 0 ? "Waiting..." : "Complete"}
                        </Button>

                        <Button
                          style={{
                            backgroundColor: "rgb(228,77,66)",
                            fontSize: "17px",
                            fontWeight: "900",
                            width: "50px",
                            border: "none",
                          }}
                          id="button-addon2"
                          onClick={() => handleDelete(e.id)}
                        >
                          <BsXSquareFill></BsXSquareFill>
                        </Button>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
