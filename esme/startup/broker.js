const mqtt = require("mqtt");
const logger = require("../core/logger");
const { broker } = require("../config/index");

const session = mqtt.connect(broker.url, {
  username: broker.username,
  password: broker.password,
});

session.on("error", (err) => {
  logger.error("MQTT " + err);
});

session.on("connect", () => {
  logger.info("Successfully connected to MQTT broker!");
});

const publishReceivedSMS = (content, address) => {
  logger.info(
    `Publishing received SMS '${content}' from ${address} to MQTT broker`
  );
  session.publish(
    broker.receiveTopic,
    JSON.stringify({ content, address }),
    null,
    (err) =>
      err ? logger.error(err) : logger.info("Message published successfully!")
  );
};

const subscribe = (smscSession) => {
  smscSession.on("deliver_sm", function (pdu) {
    smscSession.send(pdu.response());
    publishReceivedSMS(pdu.short_message.message, pdu.source_addr);
  });
};

module.exports = {
  session,
  subscribe,
};
