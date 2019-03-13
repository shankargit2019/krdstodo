import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos:any=[];
  public newTodo:any;
  public activeTasks:any;
  public path:any;
  public todo_isDone:any;
  
  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  getTodos(query = ''){
    return this.todoService.get().subscribe(todos => {
      this.todos = todos;  
      this.activeTasks = this.todos.filter(todo => todo.todo_isDone).length;
    }, error=> {
      console.log(error);
    });

  }

  addTodo(){
    this.todoService.add(this.newTodo).subscribe(todos => { this.getTodos()}, error=> {
      console.log(error);
    });
  }
 
  destroyTodo(todo) {
    this.todoService.delete(todo).subscribe(todos => { this.getTodos()}, error=> {
      console.log(error);
    });
  }

  updateTodo(e, todo){ 
    if(e.target.checked){
      this.todo_isDone=1;
    } else {
      this.todo_isDone=0;
    }    
    this.todoService.put(todo.todoId,this.todo_isDone).subscribe(todos => { this.getTodos()}, error=> {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getTodos();
  }
}
