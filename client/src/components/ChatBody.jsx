import React from "react";
import { Button, FormControl, Container } from "react-bootstrap";
import { global } from "../global/Variables";
import { Session } from "./index";

// eslint-disable-next-line react/prop-types
function ChatBody({ chatData, onClose }) {
  const [refresh, setRefresh] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState("");
  let sessionRef = React.useRef();
  sessionRef = Session();
  let newChatRef = React.useRef();

  const addMessage = () => {
    // console.log();
    fetch(global.link + "/api/addChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionRef.user.token}`,
      },
      body: JSON.stringify({
        userId: sessionRef.user.id,
        receiver: chatData[0].contactId,
        messages: [
          {
            message: newChatRef.current.value,
          },
        ],
      }),
    })
      .then((response) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        // Handle error if needed
        console.log("Error adding message:", error);
      });
  };

  const closeChat = () => {
    onClose();
  };

  React.useEffect(() => {
    if (chatData == null) return;

    const sortedMessages = [
      ...chatData[0].receivedItems.messages.map((message) => ({
        ...message,
        type: "received",
      })),
      ...chatData[0].sentItems.messages.map((message) => ({
        ...message,
        type: "sent",
      })),
    ]
      .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
      .slice(0, 10);

    setChatMessages(
      sortedMessages.map((message) => {
        // console.log(message);
        return (
          <div
            className={
              message.type === "received"
                ? "d-flex justify-content-end flex-grow-0"
                : "d-flex justify-content-start"
            }
            key={message._id}
          >
            <span
              className={
                message.type === "received"
                  ? "bg-secondary p-2 m-2"
                  : "bg-primary p-2 m-2"
              }
            >
              {message.message}
            </span>
          </div>
        );
      })
    );
  }, [chatData, refresh]);

  return (
    <div className="chat-bg p-5">
      <span className="display-1">Have fun!</span>
      {!chatData ? (
        <></>
      ) : (
        <div id="chatContainer" className="chat-container mt-5 p-md-5 p-1">
          <Button variant="dark" className="my-2" onClick={closeChat} size="sm">
            Close Chat
          </Button>
          <span className="mx-2 text-primary">{`Send to : ${chatData[0].contactName}`}</span>
          <div className="input-container d-inline-flex">
            <FormControl
              placeholder="Enter new message"
              size="sm"
              id="newChatInput"
              ref={newChatRef}
              className="new-chat"
            />
            <Button
              variant="dark"
              className="mx-2"
              onClick={addMessage}
              size="sm"
            >
              Send
            </Button>
          </div>
          <div className="p-5">{chatMessages}</div>
        </div>
      )}
    </div>
  );
}

export default ChatBody;
