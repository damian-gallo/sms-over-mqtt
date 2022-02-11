import { useState } from "react";
import mqtt from "mqtt/dist/mqtt";
import BrokerContext from "../context/brokerContext";

export const BrokerProvider = ({ children }) => {
  const [status, setStatus] = useState("Disconnected");
  const [messages, setMessages] = useState([]);
  const [sendTopic, setSendTopic] = useState();
  const [session, setSession] = useState();

  const saveMessage = (message) => setMessages((old) => [...old, message]);

  const createSession = (url, username, password, receiveTopic) => {
    const session = mqtt.connect(url, { username, password });

    session.on("message", (topic, message) =>
      saveMessage({ ...JSON.parse(String(message)), type: "received" })
    );

    session.on("connect", () => {
      setStatus((old) => "Connected");
      session.subscribe(receiveTopic);
    });

    session.on("reconnect", () => setStatus((old) => "Reconnecting..."));

    session.on("close", () => setStatus((old) => "Disconnected"));

    session.on("disconnect", () => setStatus((old) => "Disconnected"));

    session.on("offline", () => setStatus((old) => "Disconnected"));

    session.on("error", (err) => {
      console.error(err);
      setStatus((old) => "Disconnected");
    });

    return session;
  };

  const connect = ({ url, username, password, receiveTopic, sendTopic }) => {
    setSendTopic(sendTopic);
    if (!session) {
      setSession(createSession(url, username, password, receiveTopic));
      return;
    }

    session.end(true, null, () =>
      setSession(createSession(url, username, password, receiveTopic))
    );
  };

  const send = (message) => {
    session.publish(sendTopic, JSON.stringify(message), null, (err) =>
      !err ? saveMessage({ ...message, type: "sent" }) : console.error
    );
  };

  return (
    <BrokerContext.Provider value={{ status, messages, connect, send }}>
      {children}
    </BrokerContext.Provider>
  );
};
