import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/**
 * List of employees component.
 *
 * Get a list of all employees.
 */
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {
  /** Local storage for all employees */
  employees: Employee[] = [];
  /** State of loading */
  isLoading = true;
  /** Displayed columns in the table */
  displayedColumns: string[] = ['employee_name', 'employee_salary', 'employee_age'];
  /** Data source */
  dataSource: MatTableDataSource<Employee>;
  /** Paginator properties */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Construction of employees component */
  constructor(public employeeService: EmployeeService) { }

  /** Employees list initialization */
  ngOnInit() {
    this.getEmployees();
  }

  /** Get all employees */
  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

}
