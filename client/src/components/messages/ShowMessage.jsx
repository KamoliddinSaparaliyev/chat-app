import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { VscSend } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { newSocket } from "../../socket";
import "./messages.css";
import ChatMessage from "./linkMessage";
import instance from "../../helpers/inctance";

const ShowMessage = () => {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    fetchData();
    newSocket.emit("room:join", room);
    newSocket.on("message:new", (message) =>
      setMessages((prevMessage) => [...prevMessage, message])
    );
  }, []);

  async function fetchData() {
    const [userRes, messagesRes] = await Promise.all([
      instance.get("/me"),
      instance.get(`/chat/${room}`),
    ]);

    setUser(userRes.data);
    setMessages(messagesRes.data);
    console.log(messages);
  }

  function handleSubmit(e) {
    e.preventDefault();
    newSocket.emit("message:new", {
      room,
      message: e.target[0].value,
      user: user._id,
    });
    e.target.reset();
  }

  function timestap(date) {
    const current_date = new Date(date);
    const hours =
      current_date.getHours() < 10
        ? "0" + current_date.getHours()
        : current_date.getHours();
    const minute =
      current_date.getMinutes() < 10
        ? "0" + current_date.getMinutes()
        : current_date.getMinutes();

    return hours + ":" + minute;
  }

  function getCurrentDateTime(date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const now = new Date(date);
    const dayOfWeek = daysOfWeek[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <Container className="bg-light shadow-sm h-100">
      <div className="message-box overflowy-auto">
        <Link to="/messages">
          <Button color="white" className="shadow-sm py-1">
            {" "}
            <BiArrowBack />
          </Button>
        </Link>
        <div className="h-100">
          <Row style={{ height: "90vh", overflow: "hidden auto" }}>
            {messages?.map((m) => (
              <Col
                className={`d-flex align-items-baseline gap-1 ${
                  m.user === user._id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                sm={12}
                key={m._id}
              >
                {m.user !== user._id && m.user_info && (
                  <b>{m.user_info.username}</b>
                )}
                <Alert
                  className="p-1 shadow-sm"
                  color={m.user === user._id ? "primary" : "light"}
                >
                  <ChatMessage message={m.message} />
                  <small
                    href="#"
                    id={`time-${m._id}`}
                    className="text-secondary m-0 p-0 float-end"
                  >
                    {timestap(m.created_at)}
                  </small>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={`time-${m._id}`}
                  >
                    {getCurrentDateTime(m.created_at)}
                  </UncontrolledTooltip>
                </Alert>
              </Col>
            ))}
          </Row>
          <div className="mt-1">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="d-flex justify-content-center align-items-center">
                <Input
                  type="text"
                  ref={inputRef}
                  className="shadow-sm"
                  placeholder="Write a message..."
                />
                <Button color="primary" className="shadow-sm">
                  <VscSend />
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowMessage;
