import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public _url: string = 'https://my-json-server.typicode.com/Endrju0/TodoAngular/tasks';
  title = 'AngularTodo';
  tasks = [{
    id: 0,
    label: 'Feed cat',
    status: false
  }];

  constructor(private http: HttpClient) {
    this.addTaskJson();
  }


  addTask(newLabel) {
    var newTask;
    if (!Array.isArray(this.tasks) || !this.tasks.length) {
      newTask = {
        id: 1,
        label: newLabel,
        status: false
      };
    } else {
      var lastId = this.tasks[this.tasks.length-1].id;
      newTask = {
        id: lastId+1,
        label: newLabel,
        status: false
      };
    }
    this.tasks.push(newTask);
  }

  addTaskJson() {
    this.getTasks().subscribe(data => {
      for(var i = 0; i < 10; i++) {
        console.log(data[i]);
        var newTask = {
          id: data[i].id,
          label: data[i].title,
          status: data[i].completed
        };
        this.tasks.push(newTask);
      }
    });
  }

  deleteTask(task) {
    this.tasks = this.tasks.filter( t => t.label !== task.label );
  }

  changeStatus(task) {
    var i:any;
    for(i in this.tasks)
    if(this.tasks[i].label === task.label) {
      this.tasks[i].status = this.tasks[i].status ? false : true;
    }
  }

  getTasks() {
    return this.http.get<Task>(this._url);
  }

}
