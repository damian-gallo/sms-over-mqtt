import { useContext, useEffect, useRef } from "react";
import BrokerContext from "../context/brokerContext";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  CallReceived as CallReceivedIcon,
  CallMade as CallMadeIcon,
} from "@mui/icons-material";

const css = {
  root: {
    height: 700,
    overflow: "auto",
  },
  listItem: {
    width: 600,
  },
};

export const Messages = () => {
  const { messages } = useContext(BrokerContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <Paper style={css.root}>
      <List>
        {(messages || []).map((message, i) => (
          <ListItem alignItems="flex-start" key={i} style={css.listItem}>
            <ListItemAvatar>
              {message.type === "sent" ? (
                <CallMadeIcon />
              ) : (
                <CallReceivedIcon />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={message.content}
              primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
              secondary={`${
                message.type === "sent" ? "Sent to " : "Received from "
              } ${message.address}`}
            />
          </ListItem>
        ))}
        <div ref={scrollRef}></div>
      </List>
    </Paper>
  );
};
