module.exports = {
  smsc: {
    url: process.env.SMSC_URL || "smpp://smsc-simulator:2775",
    systemId: process.env.SMSC_YSTEM_ID || "admin",
    password: process.env.SMSC_PASSWORD || "secret",
    addressRange: process.env.SMPP_ADDRESS_RANGE || "52525",
    sourceAddrTON: process.env.SMPP_SOURCE_ADDR_TON || "UNKNOWN",
    sourceAddrNPI: process.env.SMPP_SOURCE_ADDR_NPI || "UNKNOWN",
    destAddrTON: process.env.SMPP_DEST_ADDR_TON || "UNKNOWN",
    destAddrNPI: process.env.SMPP_DEST_ADDR_NPI || "UNKNOWN",
    addrTON: process.env.SMPP_ADDR_TON || "UNKNOWN",
    addrNPI: process.env.SMPP_ADDR_NPI || "UNKNOWN",
  },
  broker: {
    url: process.env.BROKER_URL || "tcp://mqtt-broker",
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD,
    sendTopic: process.env.BROKER_SEND_TOPIC || "sms/send",
    receiveTopic: process.env.BROKER_RECEIVE_TOPIC || "sms/receive",
  },
  log: {
    level: process.env.LOG_LEVEL || "info",
  },
};
