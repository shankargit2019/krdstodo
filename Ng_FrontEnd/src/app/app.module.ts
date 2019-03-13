import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "./../../node_modules/angular-6-social-login";
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'login',  component: SigninComponent  },
  { path: 'todo/all',  component: TodoComponent  },
  { path: '',  component: SigninComponent  }
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [        
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("484692561001-2nlgjbmdaajhqmulaq20r86baqi8al0u.apps.googleusercontent.com")
        }         
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,    FormsModule,  SocialLoginModule,  RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
