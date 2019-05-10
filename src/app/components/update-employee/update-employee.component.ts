import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

/**
 * Update employee component.
 *
 * Can update a specific employee
 */
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.sass']
})
export class UpdateEmployeeComponent implements OnInit {
  /** Instance of employee form */
  employeeForm: FormGroup;
  /** Employee ID */
  id: number;
  /** State of loading */
  isLoading = false;

  /** Construction of update employee component*/
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  /** Form initialization */
  ngOnInit() {
    this.getEmployee(this.activatedRoute.snapshot.params['id']);
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  /** Get a specific employee to update */
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

  /** Submit updated data form */
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
