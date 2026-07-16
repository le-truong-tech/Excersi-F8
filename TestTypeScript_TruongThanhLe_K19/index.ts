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
console.log(`Check ID existence: ${customer1.id ? "Has ID" : "No ID"}\n`);

// TEST CASE 2
console.log("--- Test Case 2: Update Customer ---");
const updatedCustomer = customerService.updateById(customer1.id, {
    address: "Da Nang"
});
console.log("Customer after address update:", updatedCustomer);

// TEST CASE 3
console.log("\n--- Test Case 3: Create Employee ---");
const emp1 = employeeService.create({ name: "Truong Thanh Le" });
const emp2 = employeeService.create({ name: "Nguyen Van A" });
console.log("Employee 1 created:", emp1);
console.log("Employee 2 created:", emp2);
console.log(`Check if 2 IDs are different: ${emp1.id !== emp2.id ? "Passed" : "Failed"}\n`);

// TEST CASE 4
console.log("--- Test Case 4: Find Employee ---");
const foundEmp = employeeService.findById(emp1.id);
console.log("Found valid Employee:", foundEmp);
const notFoundEmp = employeeService.findById("fake-non-existent-id");
console.log("Find non-existent Employee (Expected: null):", notFoundEmp, "\n");

// TEST CASE 5
console.log("--- Test Case 5: Create Project ---");
const project1 = projectService.create({
    customerId: customer1.id,
    employeeId: emp1.id
});
console.log("Project created successfully:", project1, "\n");

// TEST CASE 6
console.log("--- Test Case 6: Change Project's assigned Employee ---");
const updatedProjectEmp = projectService.updateById(project1.id, {
    employeeId: emp2.id
});
console.log("Project after Employee change:", updatedProjectEmp, "\n");

// TEST CASE 7
console.log("--- Test Case 7: Update only CustomerId ---");
const updatedProjectCustomer = projectService.updateById(project1.id, {
    customerId: "new-customer-123"
});
console.log("Project after Customer ID update:", updatedProjectCustomer, "\n");

// TEST CASE 8
console.log("--- Test Case 8: Update data with fake ID ---");
const fakeId = "fake-uuid-not-real";
console.log("Update fake Customer (Expected: null):", customerService.updateById(fakeId, { name: "X" }));
console.log("Update fake Employee (Expected: null):", employeeService.updateById(fakeId, { name: "Y" }));
console.log("Update fake Project (Expected: null):", projectService.updateById(fakeId, { customerId: "Z" }), "\n");

// TEST CASE 9
console.log("--- Test Case 9: Create Project with fake Employee ---");
const project2 = projectService.create({
    customerId: customer1.id,
    employeeId: "employee-resigned-id" 
});
console.log("Project still created successfully (No notification):", project2, "\n");
