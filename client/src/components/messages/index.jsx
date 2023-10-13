import React, { useEffect, useState } from "react";
import instance from "../../helpers/inctance";
import { ListGroup, ListGroupItem, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { newSocket } from "../../socket";

const ListMessages = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchData();

    newSocket.on("room:new", (room) => {
      setRooms((prev) => [...prev, room]);
    });

    newSocket.on("room:list", (rooms) => console.log(rooms));

    return () => {
      newSocket.off("room:new");
      newSocket.off("error");
    };
  }, []);

  async function fetchData() {
    try {
      const [roomsRes, usersRes, userRes] = await Promise.all([
        instance.get("/rooms"),
        instance.get("/users"),
        instance.get("/me"),
      ]);

      setUsers(usersRes.data);
      setRooms(roomsRes.data);
      setUser(userRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid className="overflow-hidden" style={{ height: "100vh" }}>
      <Row className="shadow rounded rounded-4 mt-1 h-100 bg-body-secondary">
        <Col sm={4} className="bg-white  p-0">
          <ListGroup className="rounded rounded-4 bg-light">
            <center className="text-secondary">Rooms</center>
            {rooms.map((m) => (
              <Link
                to={`/messages/${m._id}`}
                key={m._id}
                className="text-decoration-none"
              >
                <ListGroupItem action={true} className="p-3">
                  <b className="mb-1 ms-1">{m.name}</b>
                </ListGroupItem>
              </Link>
            ))}
          </ListGroup>
          <ListGroup className="rounded rounded-4 bg-light">
            <center className="text-secondary">Users</center>
            {users.map((m) =>
              m._id === user._id ? (
                <div key={m._id}></div>
              ) : (
                <Link
                  // to={`/messages/${m._id}`}
                  key={m._id}
                  className="text-decoration-none"
                >
                  <ListGroupItem action={true} className="p-3">
                    <b className="mb-1 ms-1">{m.username}</b>
                  </ListGroupItem>
                </Link>
              )
            )}
          </ListGroup>
        </Col>
        <Col sm={8}>{children}</Col>
      </Row>
    </Container>
  );
};

export default ListMessages;
