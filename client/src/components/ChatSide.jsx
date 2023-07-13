import React from "react";
import { Session } from "./index";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import { global } from "../global/Variables";
import $ from "jquery";

// eslint-disable-next-line react/prop-types
function ChatSide({ fetchChatData }) {
  const [refresh, setRefresh] = React.useState(0);
  const [contacts, setContacts] = React.useState([]);

  let sessionRef = React.useRef();
  sessionRef = Session();

  let inputRef = React.useRef();

  const addContact = () => {
    // console.log("add contact test", inputRef.current.value);
    if (inputRef.current.value == sessionRef.user.email) {
      alert("you cant add yourself");
    } else {
      fetch(global.link + "/api/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputRef.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data, "test check email");
          if (data) {
            fetch(global.link + "/api/createContact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: sessionRef.user.id,
                contactName: inputRef.current.value,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                if (data == 2) {
                  Swal.fire({
                    title: "Add contact failed",
                    text: "Contact already added!",
                    icon: "warning",
                  });
                } else {
                  Swal.fire({
                    title: "Add contact failed",
                    text: "Contact Added!",
                    icon: "success",
                  }).then(() => {
                    refreshData();
                    document.getElementById("input").value = "";
                  });
                }
              });
          } else {
            Swal.fire({
              title: "Add contact failed",
              text: "Email not found!",
              icon: "error",
            });
          }
        });
    }
  };

  const getContactList = () => {
    // console.log("test getcontactlist");
    fetch(global.link + "/api/contacts", {
      headers: {
        Authorization: `Bearer ${sessionRef.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.contacts);
        if (data)
          setContacts(
            data.contacts.map((items) => {
              return (
                <div className="my-2" key={items._id}>
                  <span className="contactName-text">{items.contactName}</span>

                  <Button
                    className="ms-2"
                    variant="dark"
                    onClick={() =>
                      chatContact(
                        items.contactId,
                        sessionRef.user.id,
                        items.contactName
                      )
                    }
                    size="sm"
                  >
                    Chat
                  </Button>
                  <Button
                    className="ms-2"
                    variant="dark"
                    onClick={() => deleteContact(items._id, sessionRef.user.id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          );
      });
  };

  const deleteContact = (contactId, userId) => {
    // console.log(contactId);
    fetch(global.link + "/api/deleteContact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactId: contactId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Removed",
            text: "Contact Removed!",
            icon: "warning",
          }).then(() => {
            refreshData();
          });
        } else {
          Swal.fire({
            title: "Contact remove failed",
            text: "Please contact admin",
            icon: "danger",
          });
        }
      });
  };

  const chatContact = async (receiverId, userId, receiverName) => {
    fetchChatData(receiverId, userId, receiverName);
  };

  function refreshData() {
    setRefresh((x) => x + 1);
  }

  React.useEffect(() => {
    getContactList();
  }, [refresh]);

  return (
    <div className="contact-bg p-2 p-md-5 bg-secondary">
      <center>
        <div className="text-muted">USER</div>
        <span className="mb-3 user-text">{sessionRef.user.email}</span>
        <div className="addContactDiv px-5 py-3">
          <Row>
            <Col md={9}>
              <FormControl placeholder="Enter email" size="sm" ref={inputRef} />
            </Col>
            <Col md={3}>
              <Button
                variant="dark"
                className="mx-2"
                onClick={addContact}
                size="sm"
              >
                Add
              </Button>
            </Col>
          </Row>
        </div>
        <div className="mt-5">
          <span className="text-muted">contact list</span>
          {contacts}
        </div>

        <div className="mt-5 text-muted">chat history</div>
      </center>
    </div>
  );
}

export default ChatSide;
