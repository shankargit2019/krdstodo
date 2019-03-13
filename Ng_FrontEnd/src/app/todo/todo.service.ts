import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninComponent} from '../signin/signin.component';

let TODOS = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  resVal:object;
  apiUrl:string = 'http://localhost:3000/todo';
  options = {'Content-Type': 'application/json'};
  constructor(private http:HttpClient) { }

  get(){
      return this.http.get(this.apiUrl);
  }
  
  add(data) {
     return this.http.post(this.apiUrl+'/add',  {'todoTxt': data});
  }

  addGmailUser(data) {    
    return this.http.post(this.apiUrl+'/addSocialUser',  {'todoTxt': data});
    //,'name':data.name,    'emailId': data.email, 'userLogged':1
 }

  delete(selected) {
      return this.http.delete(this.apiUrl+'/del/' + selected.todoId);
  }

  put(todoId, todoIsDone) {
    return this.http.put(this.apiUrl+'/update', {'todoId': todoId,'todoIsDone': todoIsDone });
  }
}