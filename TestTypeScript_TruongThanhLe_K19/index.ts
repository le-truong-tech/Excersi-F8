import { CustomerService } from "./services/CustomerService.js";
import { EmployeeService } from "./services/EmployeeService.js";
import { ProjectService } from "./services/ProjectService.js";

const customerService = new CustomerService();
const employeeService = new EmployeeService();

const projectService = new ProjectService(employeeService); 

// TEST CASE 1
console.log("--- Test Case 1: Create Customer ---");
const customer1 = customerService.create({
    name: "ABC Company",
    tax: "0101234567",
    address: "Hanoi"
});
console.log("Customer created successfully:", customer1);
console.log(`Check ID existence: ${customer1.id ? "Has ID" : "No ID"}`);

// TEST CASE 2
console.log("--- Test Case 2: Update Customer ---");
const updatedCustomer = customerService.updateById(customer1.id, {
    address: "Da Nang"
});
console.log("Customer after address update:", updatedCustomer);

// TEST CASE 3
console.log("--- Test Case 3: Create Employee ---");
const emp1 = employeeService.create({ name: "Truong Thanh Le" });
const emp2 = employeeService.create({ name: "Nguyen Van A" });
console.log(emp1);
console.log(emp2);
console.log(`Check if 2 IDs are different: ${emp1.id !== emp2.id ? "Passed" : "Failed"}`);

// TEST CASE 4
console.log("--- Test Case 4: Find Employee ---");
const foundEmp = employeeService.findById(emp1.id);
console.log("Found valid Employee:", foundEmp);
const notFoundEmp = employeeService.findById("fake-id");
console.log("Find fake-id (Expected: null):", notFoundEmp);

// TEST CASE 5
console.log("--- Test Case 5: Create Project ---");
const project1 = projectService.create({
    customerId: customer1.id,
    employeeId: emp1.id
});
console.log("Project created successfully:", project1);

// TEST CASE 6
console.log("--- Test Case 6: Change Project's assigned Employee ---");
const updatedProjectEmp = projectService.updateById(project1.id, {
    employeeId: emp2.id
});
console.log("Project after Employee change:", updatedProjectEmp);

// TEST CASE 7
console.log("--- Test Case 7: Update only CustomerId ---");
const updatedProjectCustomer = projectService.updateById(project1.id, {
    customerId: "newCustomer123"
});
console.log("Project after Customer ID update:", updatedProjectCustomer);

// TEST CASE 8
console.log("--- Test Case 8: Update data with fake ID ---");
const fakeId = "fakeid";
console.log("Update fake Customer:", customerService.updateById(fakeId, { name: "X" }));
console.log("Update fake Employee:", employeeService.updateById(fakeId, { name: "Y" }));
console.log("Update fake Project:", projectService.updateById(fakeId, { customerId: "Z" }));

// TEST CASE 9
console.log("--- Test Case 9: Create Project with fake Employee ---");
const project2 = projectService.create({
    customerId: customer1.id,
    employeeId: "employeeResignedId" 
});
console.log("Project still created successfully:", project2, "\n");
