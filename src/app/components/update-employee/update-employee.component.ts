import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.sass']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  id: number;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployee(this.activatedRoute.snapshot.params['id']);
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(employee => {
      this.id = employee.id;
      this.employeeForm.setValue({
        name: employee.employee_name,
        salary: employee.employee_salary,
        age: employee.employee_age
      });
    });
  }

  onDataSubmit(form: NgForm) {
    this.isLoading = true;
    this.employeeService.updateEmployee(this.id, form).subscribe(
      result => {
        this.isLoading = false;
        this.router.navigate(['/employee', this.id]);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
