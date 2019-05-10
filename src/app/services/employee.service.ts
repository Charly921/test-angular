import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
/** Http options */
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/** Api URL */
const url = 'http://dummy.restapiexample.com/api/v1/';

/**
 * Service of employees
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /** Construction of employee service */
  constructor(private http: HttpClient) { }

  /**
   * Get all employees
   *
   * @returns {Array} All employees
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${url}employees`)
    .pipe(
      catchError(this.handleError('getEmployees', []))
    );
  }

  /**
   * Get employee
   *
   * @param {number} Employee id to get
   * @returns {Employe} Specific employee
   */
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${url}employee/${id}`)
    .pipe(
      catchError(this.handleError<Employee>(`getEmployee/${id}`))
    );
  }

  /**
   * Create employee
   *
   * @param {any} Employee to create
   */
  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(`${url}create`, employee, httpOptions)
    .pipe(
      catchError(this.handleError<Employee>('createEmployee'))
    );
  }

  /**
   * Update employee
   *
   * @param {number} Employee id to update
   * @param {any} Employee to update
   */
  updateEmployee(id: number, employee): Observable<any> {
    return this.http.put(`${url}update/${id}`, employee, httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /**
   * Delete employee
   *
   * @param {number} Employee to delete
   */
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${url}delete/${id}`, httpOptions)
    .pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** Handle error */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
