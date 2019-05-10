import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  isLoading = true;
  displayedColumns: string[] = ['employee_name', 'employee_salary', 'employee_age'];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
    // this.dataSource = new MatTableDataSource<Employee>(this.employees);
    // this.dataSource.paginator = this.paginator;
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log(employees);
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

}
