import {Component, OnInit} from '@angular/core';
import {AuthService,GoogleLoginProvider} from './../../../node_modules/angular-6-social-login';
import { Router } from '@angular/router';
import { TodoService } from './../todo/todo.service';
//import { socialAuthService} from './../../../node_modules/angular-6-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [TodoService]
}) 
 
export class SigninComponent {
  blockType:string = 'login';
  newTodo: string='';
  constructor( private socialAuthService: AuthService, private todoService: TodoService,private router:Router ) {}
  
  getTodos(query = ''){
  }

  public socialSignIn(socialPlatform : string) {    
    let socialPlatformProvider: any;
   if(socialPlatform == "google"){    
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {        
        //console.log(socialPlatform + " sign in data : " , userData);        
        //this.socialAuthService.signIn(userData);      
       
          this.todoService.addGmailUser(userData).subscribe(todos => { this.getTodos()}, error=> {
            console.log(error);
          });        

        this.router.navigate(['/todo/all']);       
            
      }
    );
  } 
  ngOnInit() {
    this.getTodos();
  } 
}


