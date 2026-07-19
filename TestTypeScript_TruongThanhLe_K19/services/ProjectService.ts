import { v7 } from "uuid";
import type { ProjectI } from "../models/Project";
import type { Employee } from "../models/Employee";
import type { EmployeeService, EmployeeServiceI } from "./EmployeeService";
export interface ProjectServiceI {
    create(project: Omit<ProjectI, "id" | "receiveNoti">): ProjectI;
    updateById(id: string, data: Partial<ProjectI>): ProjectI | null;
}

export class ProjectService implements ProjectServiceI {
    private projects: ProjectI[] = [];

    constructor(private employeeService: EmployeeServiceI){};

    create(project: Omit<ProjectI, "id">): ProjectI {
        const newProject = {...project, "id": v7()};
        this.projects.push(newProject);

        const employee = this.employeeService.findById(project.employeeId);
        if(employee) employee.receiveNoti("Bạn vừa được gán vào dự án mới");
        
        return newProject;
    }
    updateById(id: string, data: Partial<ProjectI>): ProjectI | null {
        let project: ProjectI | null = this.findById(id);
        if(!project) return null;
        if(project.employeeId !== data.employeeId || project.customerId !== data.customerId) {      
            const employee = this.employeeService.findById(project.employeeId);
            if(!employee) throw new Error(`I not found employee id: ${project.employeeId}`);
            Object.assign(project, data);
            if(data.employeeId) employee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
        }
        return project;
    }

    findById(id: string): ProjectI | null {
        return this.projects.find(p => p.id === id) || null;
    }

}