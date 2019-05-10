import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

const routes: Routes = [
  {  path: '', redirectTo: '/employees', pathMatch: 'full' },
  {  path: 'employees', component: EmployeesComponent  },
  {  path: 'employee/:id', component: EmployeeComponent  },
  {  path: 'create', component: CreateEmployeeComponent  },
  {  path: 'update/:id',  component: UpdateEmployeeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
