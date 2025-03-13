const data = {};
data.employees = require("../model/employees.json");
data.setemployees = function (data) {
  this.employees = data;
};

const getallemp = (req, res) => {
  res.json(data.employees);
};

const createnewemp = (req, res) => {
  const newemployee = {
    id: data.employees.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newemployee.firstname || !newemployee.lastname) {
    res.json({ message: "firstname and lastname are required" });
  }

  data.setemployees([...data.employees, newemployee]);
  res.json(data.employees);
};

const updateemp = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id),
  );
  if (!employee) {
    res.json({ message: "Employee not found" });
  }
  if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    employee.lastname = req.body.lastname;
  }

  const filteredArray = data.employees.filter((emp) => emp.id != req.body.id);
  const passingarray = [...filteredArray, employee];

  data.setemployees(
    passingarray.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
  );
  res.json(data.employees);
};

const deleteemp = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  if (!employee) {
    res.json({ message: "Employee not found" });
  }

  const filteredArray = data.employees.filter((emp) => emp.id != req.body.id);
  const passingArray = [...filteredArray];
  data.setemployees(passingArray);
  res.json(data.employees);
};

const getemp = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  if (!employee) {
    res.json({ message: "Employee not found" });
  }
  res.json(employee);
};

module.exports = {
  getallemp,
  createnewemp,
  updateemp,
  deleteemp,
  getemp,
};
