import { useContext, useState } from "react";
import BrokerContext from "../context/brokerContext";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Divider,
  Chip,
} from "@mui/material";

const css = {
  root: {
    maxWidth: 300,
  },
};

export const BrokerConnectionPanel = () => {
  const { status, connect } = useContext(BrokerContext);
  const [options, setOptions] = useState({
    url: "ws://localhost:9001",
    username: "",
    password: "",
    sendTopic: "sms/send",
    receiveTopic: "sms/receive",
  });

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      align="center"
      style={css.root}
    >
      <Grid item>
        <Divider>
          <Chip label="MQTT Broker" variant="outlined" size="small" />
        </Divider>
      </Grid>
      <Grid item>
        <Typography>{`Status: ${status}`}</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="URL"
          size="small"
          fullWidth
          value={options.url}
          onChange={(e) =>
            setOptions((old) => ({ ...old, url: e.target.value }))
          }
        />
      </Grid>
      <Grid item>
        <TextField
          label="Username"
          size="small"
          fullWidth
          value={options.username}
          onChange={(e) =>
            setOptions((old) => ({ ...old, username: e.target.value }))
          }
        />
      </Grid>
      <Grid item>
        <TextField
          label="Password"
          size="small"
          fullWidth
          value={options.password}
          onChange={(e) =>
            setOptions((old) => ({ ...old, password: e.target.value }))
          }
        />
      </Grid>
      <Grid item>
        <TextField
          label="Send SMS's Topic"
          size="small"
          fullWidth
          value={options.sendTopic}
          onChange={(e) =>
            setOptions((old) => ({ ...old, sendTopic: e.target.value }))
          }
        />
      </Grid>
      <Grid item>
        <TextField
          label="Receive SMS's Topic"
          size="small"
          fullWidth
          value={options.receiveTopic}
          onChange={(e) =>
            setOptions((old) => ({ ...old, receiveTopic: e.target.value }))
          }
        />
      </Grid>
      <Grid item>
        <Button onClick={() => connect(options)} variant="contained">
          Connect
        </Button>
      </Grid>
    </Grid>
  );
};
