import { useContext, useState } from "react";
import BrokerContext from "../context/brokerContext";
import { Send as SendIcon } from "@mui/icons-material";
import { Grid, Button, TextField } from "@mui/material";

const css = {
  contentTextfield: {
    width: 350,
  },
  addressTextfield: {
    width: 150,
  },
  sendButton: {
    height: "100%",
  },
};

export const MessageSender = () => {
  const { status, send } = useContext(BrokerContext);
  const [message, setMessage] = useState({
    content: "Hello there",
    address: "1713920000",
  });

  return (
    <div>
      <Grid container spacing={2} align="center">
        <Grid item>
          <TextField
            fullWidth
            label="Content"
            style={css.contentTextfield}
            inputProps={{
              maxLength: 140,
            }}
            value={message.content}
            onChange={(e) =>
              setMessage((old) => ({ ...old, content: e.target.value }))
            }
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Address"
            style={css.addressTextfield}
            value={message.address}
            onChange={(e) =>
              setMessage((old) => ({ ...old, address: e.target.value }))
            }
          />
        </Grid>
        <Grid item>
          <Button
            disabled={status !== "Connected"}
            variant="contained"
            endIcon={<SendIcon />}
            style={css.sendButton}
            onClick={() => send(message)}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
