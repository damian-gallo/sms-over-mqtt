const smsc = require("./startup/smsc");
const broker = require("./startup/broker");

smsc.subscribe(broker.session);
broker.subscribe(smsc.session);
