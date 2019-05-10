import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = 'http://dummy.restapiexample.com/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${url}employees`)
    .pipe(
      catchError(this.handleError('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${url}employee/${id}`)
    .pipe(
      catchError(this.handleError<Employee>(`getEmployee/${id}`))
    );
  }

  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(`${url}create`, employee, httpOptions)
    .pipe(
      catchError(this.handleError<Employee>('createEmployee'))
    );
  }

  updateEmployee(id: number, employee): Observable<any> {
    return this.http.put(`${url}update/${id}`, employee, httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${url}delete/${id}`, httpOptions)
    .pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
