import { Grid, Stack } from "@mui/material";
import { BrokerConnectionPanel } from "./BrokerConnectionPanel";
import { MessageSender } from "./MessageSender";
import { Messages } from "./Messages";

const css = {
  root: {
    height: "100vh",
    padding: 20,
  },
};

export const Dashboard = () => {
  return (
    <Grid container spacing={2} justifyContent="center" style={css.root}>
      <Grid item>
        <BrokerConnectionPanel />
      </Grid>
      <Grid item>
        <Stack direction="column" justifyContent="flex-end" spacing={2}>
          <Messages />
          <MessageSender />
        </Stack>
      </Grid>
    </Grid>
  );
};
