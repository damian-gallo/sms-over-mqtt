const smpp = require("smpp");
const logger = require("../core/logger");
const { isValidJSON } = require("../utils");
const messageSchema = require("../schemas/message");
const { smsc, broker } = require("../config/index");

const session = smpp.connect({
  url: smsc.url,
  auto_enquire_link_period: 10000,
});

session.on("close", () => {
  throw new Error("SMSC connection closed");
});

session.on("error", (err) => logger.error(err.stack));

session.bind_transceiver(
  {
    system_id: smsc.systemId,
    password: smsc.password,
    addr_ton: smpp.consts.TON[smsc.addrTON],
    addr_npi: smpp.consts.NPI[smsc.addrNPI],
    address_range: smsc.addressRange,
  },
  (pdu) => {
    if (pdu.command_status !== 0) {
      logger.error(
        `bind_transceiver failed with command_status = ${pdu.command_status}`
      );
      throw new Error(`Cannot connect to SMSC`);
    }
    logger.info("Successfully connected to SMSC!");
  }
);

const sendSMS = ({ content, address }) => {
  logger.info(`Sending SMS '${content}' to ${address}...`);
  session.submit_sm(
    {
      short_message: content,
      destination_addr: address,
      source_addr: smsc.addressRange,
      source_addr_ton: smpp.consts.TON[smsc.sourceAddrTON],
      source_addr_npi: smpp.consts.NPI[smsc.sourceAddrNPI],
      dest_addr_ton: smpp.consts.TON[smsc.destAddrTON],
      dest_addr_npi: smpp.consts.NPI[smsc.destAddrNPI],
    },
    (pdu) => {
      if (pdu.command_status !== 0) {
        logger.error(
          `submit_sm failed with command_status = ${pdu.command_status}`
        );
        return;
      }
      logger.info(`Message successfully sent!`);
    }
  );
};

const subscribe = (brokerSession) => {
  brokerSession.subscribe(broker.sendTopic);
  brokerSession.on("message", (topic, message) => {
    if (!isValidJSON(message)) {
      logger.error(`Invalid JSON: ${message}`);
      return;
    }

    const parsedMessage = JSON.parse(message.toString());
    const { error } = messageSchema.validate(parsedMessage);
    if (error) {
      logger.error(error);
      return;
    }

    sendSMS(parsedMessage);
  });
};

module.exports = {
  session,
  subscribe,
};
