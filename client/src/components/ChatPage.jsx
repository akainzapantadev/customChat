import React from "react";
import { Session, ChatSide, ChatBody } from "./index";
import { Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { global } from "../global/Variables";

function ChatPage() {
  let sessionRef = React.useRef();
  sessionRef = Session();

  const [chatData, setChatData] = React.useState(null);

  const fetchChatData = async (receiverId, userId, receiverName) => {
    try {
      const sentItems = fetch(global.link + "/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionRef.user.token}`,
        },
        body: JSON.stringify({
          userId: userId,
          contactName: receiverId,
        }),
      });

      const receivedItems = fetch(global.link + "/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionRef.user.token}`,
        },
        body: JSON.stringify({
          userId: receiverId,
          contactName: userId,
        }),
      });

      Promise.all([sentItems, receivedItems])
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        })
        .then(([data1, data2]) => {
          const conversationData = {
            sentItems: data1,
            receivedItems: data2,
          };
          const pushReceiverName = [
            {
              ...conversationData,
              contactName: receiverName,
              contactId: receiverId,
            },
          ];
          setChatData(pushReceiverName);
          // console.log(pushReceiverName);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const chatDataOnClose = () => {
    setChatData(null);
  };

  return sessionRef.session === 1 ? (
    <div>
      <Row>
        <Col md={3}>
          <ChatSide fetchChatData={fetchChatData} />
        </Col>
        <Col md={9}>
          <ChatBody chatData={chatData} onClose={chatDataOnClose} />
        </Col>
      </Row>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ChatPage;
