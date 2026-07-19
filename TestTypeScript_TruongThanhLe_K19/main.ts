import type { CustomerI } from "./models/Customer";
import type { Employee, EmployeeI } from "./models/Employee";
import { CustomerService } from "./services/CustomerService";
import { EmployeeService } from "./services/EmployeeService";
import { ProjectService } from "./services/ProjectService";


function init () {
    const customerServive: CustomerService = new CustomerService();
    const employeeService: EmployeeService = new EmployeeService();
    const projectService: ProjectService = new ProjectService(employeeService);

    //TestCase 1:
    console.log("---Test Case 1: Create Customer: ---");
    const customer1: CustomerI = customerServive.create({name: "Trương Thành Lê", tax: "123456789", address: "Hòa Xuân, Đà Nẵng"});
    console.log(customer1);

    //TestCase 2:
    console.log("\n---Test Case 2: Update Customer: ---");
    const updateCustomer1: CustomerI | null = customerServive.updateById(customer1.id, {name: "Trương Quỳnh Lam"})
    console.log(updateCustomer1);

    //TestCase 3:
    console.log("\n---Test Case 3: Create two employee: ---");
    const employee1: EmployeeI = employeeService.create({name: "Nguyễn Văn A"});
    const employee2: EmployeeI = employeeService.create({name: "Nguyễn Văn B"});
    console.log("Employee 1: ", employee1);
    console.log("Employee 2: ", employee2);
    (employee1.id === employee2.id) ? console.log("2 id similar") : console.log("2 id different");

    //TestCase 4
    console.log("\n---Test Case 4: Find employee: ---");
    console.log("Case true: Find id: ", employee1.id);
    console.log("Result: ", employeeService.findById(employee1.id));
    const idTest = "testid123"
    console.log("Case false: Find id: ", idTest);
    console.log("Result: ", employeeService.findById(idTest));

    //TestCase 5
    console.log("\n---Test Case 5: Create project: ---");
    const project1 = projectService.create({customerId: customer1.id, employeeId: employee1.id});
    console.log(project1);

    //TestCase 6
    console.log("\n---Test Case 6: Update employee project: ---");
    console.log(projectService.updateById(project1.id, {employeeId: employee2.id}));

    //TestCase 7
    console.log("\n---Test Case 7: Update customer project: ---");
    const customer2: CustomerI = customerServive.create({name: "Lê Thị Mi Sa", tax: "09876655", address: "Hải Châu, Đà Nẵng"});
    console.log(projectService.updateById(project1.id, {customerId: customer2.id}));

    //TestCase 8
    console.log("\n---Test Case 8: The data update does not exist: ---");
    console.log("result: ", customerServive.updateById(idTest, {name: "Test"}))
    console.log("result: ", employeeService.updateById(idTest, {name: "Test"}))
    console.log("result: ", projectService.updateById(idTest, {employeeId: employee1.id}))

    //TestCase 9
    console.log("\n---Test Case 9: ---");
    console.log(projectService.create({customerId: customer1.id, employeeId: idTest}))
    
}

init();