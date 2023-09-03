import React, { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import Popup from "reactjs-popup";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Nav,
  NavLink,
} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./homepage.css";

function Home() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [inputbox, setInputbox] = useState("");
  const [title, setTitle] = useState("");
  const [getTask, setGetTask] = useState([]);

  const [checkbox, setSetCheckBox] = useState(true);

  const [toDoItems, setToDoItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get").then((data) => {
      const tasks = data.data.message;
      const todo = tasks.filter((task) => task.status === "To Do");
      const pending = tasks.filter((task) => task.status === "pending");
      const done = tasks.filter((task) => task.status === "done");
      setGetTask(tasks);
      setToDoItems(todo);
      setPendingItems(pending);
      setDoneItems(done);
    });
  }, []);

  const HandleSubmit = (e) => {
    // console.log("hii");

    e.preventDefault();
    axios
      .post("https://gem-square-fahrenheit.glitch.me/create", { title: title, task: inputbox })
      .then(() => {
        window.location.reload();
      });
  };

  const HandleDelete = (id) => {
    console.log(id);
    axios.post("https://gem-square-fahrenheit.glitch.me/del", { id: id }).then(() => {
      window.location.reload();
    });
  };

  const HandleUpdate = (e) => {
    // e.preventDefault()
    console.log(e);
    axios.post("https://gem-square-fahrenheit.glitch.me/upd", { id: e,title:title,task:inputbox }).then(() => {
   
    });
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyToDoItems = [...toDoItems];
    const copyPendingItems = [...pendingItems];
    const copyDoneItems = [...doneItems];

    const dragItemContent = copyToDoItems[dragItem.current];

    if (dragItem.current !== null) {
      copyToDoItems.splice(dragItem.current, 1);
    } else if (dragItem.current !== null) {
      copyPendingItems.splice(dragItem.current, 1);
    } else if (dragItem.current !== null) {
      copyDoneItems.splice(dragItem.current, 1);
    }

    if (dragOverItem.current !== null) {
      if (dragOverItem.current === "To Do") {
        copyToDoItems.push(dragItemContent);
      } else if (dragOverItem.current === "Pending") {
        copyPendingItems.push(dragItemContent);
      } else if (dragOverItem.current === "Done") {
        copyDoneItems.push(dragItemContent);
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;

    setToDoItems(copyToDoItems);
    setPendingItems(copyPendingItems);
    setDoneItems(copyDoneItems);
  };

  const HandleCheck = (id) => {
    axios.post("https://gem-square-fahrenheit.glitch.me/update", { id: id }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className="add-task">
        <Form className="d-flex" onSubmit={HandleSubmit}>
          <Form.Control
            type="text"
            placeholder="Add Title"
            aria-label="Search"
            required
            value={inputbox}
            onChange={(e) => setInputbox(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Add Description"
            aria-label="Search"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <Button
            variant="warning"
            style={{ borderRadius: "10px" }}
            type="submit"
          >
            Add Task
          </Button>
        </Form>
      </div>
      <div className="card-container">
        <Card>
          <Card.Body>
            <ul className="draggable-list">
              <h3>To Do</h3>
              {getTask.map((data, i) => (
                <Draggable
                  onDragStart={(e) => dragStart(e, i)}
                  onDragEnter={(e) => dragEnter(e, i)}
                  onDragEnd={drop}
                  key={data._id}
                >
                  <li className="draggable-item">
                    <div style={{ display: "flex" }}>
                      <div className="item-content">
                        <h5>{data.task} </h5> {data.title}
                      </div>

                      <button
                        className="delete-button"
                        onClick={() => HandleDelete(data._id)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                      {/* <Popup
                        trigger={
                          <button className="delete-button">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="update-popup">
                            <button className="close" onClick={close}>
                              &times;
                            </button>
                            <div className="update-content">
                               <Form className="d-flex" >
                                <Form.Control
                                  type="text"
                                  placeholder="Add Title"
                                  aria-label="Search"
                            
                                  value={data.task}
                                  onChange={(e) => setInputbox(e.target.value)}
                                />
                                <Form.Control
                                  type="text"
                                  placeholder="Add Description"
                                  aria-label="Search"
                          
                                  value={data.title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />{" "}
                                <Button
                                  variant="warning"
                                  style={{ borderRadius: "10px" }}
                                  type="submit"
                                  onSubmit={HandleUpdate(data._id)}
                                >
                                  Update Task
                                </Button>
                              </Form> 
                            </div>
                          </div>
                        )}
                      </Popup> */}

                      {/* 
                      <button className="delete-button">
                        <NavLink to="/update">
                          <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                      </button> */}
                    </div>
                  </li>
                </Draggable>
              ))}
            </ul>
          </Card.Body>
        </Card>

        <Card className="pending-card">
          <Card.Body>
            <h3>Pending</h3>
            <ul className="draggable-list">
              {pendingItems.map((item, index) => (
                <Draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={item._id}
                >
                  <li key={index} className="draggable-item">
                    <div style={{ display: "flex" }}>
                      <div className="item-content">
                        <h5>{item.task} </h5> {item.title}
                      </div>

                      <Form.Check
                        type="checkbox"
                        //  label="Remember me"
                        checked={checkbox}
                        onChange={(e) => HandleCheck(item._id)}
                      />
                    </div>
                  </li>
                </Draggable>
              ))}
            </ul>
          </Card.Body>
        </Card>

        <Card className="done-card">
          <Card.Body>
            <h3>Done</h3>
            <ul className="draggable-list">
              {doneItems.map((item, index) => (
                <Draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={item._id}
                >
                  <li key={index} className="draggable-item">
                    <div style={{ display: "flex" }}>
                      <div className="item-content">
                        <h5>{item.task} </h5> {item.title}
                      </div>
                    </div>
                  </li>
                </Draggable>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default Home;
