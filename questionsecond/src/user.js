const mysql = require("mysql");
const Promise = require("bluebird");
const { add } = require("nodemon/lib/rules");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "webexam",
};

const record = {
  sender: "Awesh",
  reciver: "My Dad",
  msg: " hello abbujaan miss you",
};

const addRecord = async (record) => {
  const Connection = mysql.createConnection(dbinfo);
  await Connection.connectAsync();
  const sql = `insert into message ( sender,reciver, msg ) values (?,?,?)`;
  await Connection.queryAsync(sql, [record.sender, record.reciver, record.msg]);
  await Connection.endAsync();
  console.log("heyyy message added");
};

const getRecord = async () => {
  const Connection = mysql.createConnection(dbinfo);
  await Connection.connectAsync();
  const sql = `select * from message`;

  const list = await Connection.queryAsync(sql, []);
  await Connection.endAsync();
  console.log("List of record is...!");
  console.log(list);
  return list;
}

getRecord()

module.exports = { addRecord, getRecord };
