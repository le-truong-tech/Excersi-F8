import { v7 } from "uuid";
import type { Project } from "../models/Project.js";
import type { EmployeeService } from "./EmployeeService.js";


export class ProjectService {
    private projects: Project[] = [];

    constructor(private employeeService: EmployeeService) {

    }

    create(data: Omit<Project, "id">) : Project {
        const newProject = {id: v7(), ...data};
        this.projects.push(newProject);

        const employee = this.employeeService.findById(data.employeeId)
        if(employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới.")
        }

        return newProject;
    }

    updateById(id: string, data: Partial<Project>): Project | null {

        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) {return null;}

        const oldProject = this.projects[index];
        const newEmployeeId = data.employeeId;
        
        if (!oldProject) return null; 
        this.projects[index] = {...oldProject, ...data};

        if (newEmployeeId && newEmployeeId !== oldProject.employeeId) {
            const newEmployee = this.employeeService.findById(newEmployeeId);
            if (newEmployee) {
                newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
            }
        }

        return this.projects[index];
    }
}