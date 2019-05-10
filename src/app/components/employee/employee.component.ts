import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {

  employee: Employee;
  id: number;
  isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEmployee(this.id);
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      employee => {
        this.employee = employee;
        this.isLoading = false;
      },
      err => console.log(err)
    );
  }

  deleteEmployee(id: number) {
    this.isLoading = true;
    this.employeeService.deleteEmployee(id).subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['/employees']);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

}
