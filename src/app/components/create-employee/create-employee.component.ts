import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  onDataSubmit(form: NgForm) {
    this.isLoading = true;
    this.employeeService.createEmployee(form).subscribe(
      result => {
        const id = result['id'];
        this.isLoading = false;
        this.router.navigate(['/employee', id]);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      });
  }

}
