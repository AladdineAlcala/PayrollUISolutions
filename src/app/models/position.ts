import { Employee } from "./employee";



export interface Position{

    pos_Id:number;
    positionName:string;

    Employees:Employee[];
    
}