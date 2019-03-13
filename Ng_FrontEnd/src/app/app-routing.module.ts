import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {TodoComponent} from './todo/todo.component';

const routes: Routes = [
  { path: '',  component: SigninComponent  },
  { path: 'login',  component: SigninComponent  },
  { path: 'todo/all',  component: TodoComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
