import uniqid from 'uniqid'
import Task from './Task'

export default class TaskList {
  constructor() {
    this.tasks = []
  }

  addTask(taskDescription) {
    const newTask = new Task(uniqid(), taskDescription, false)
    this.tasks.push(newTask)
    this.persistData()
    return newTask
  }

  deleteTask(id) {
    const indexTask = this.tasks.findIndex(cur => id === cur.id)
    this.tasks.splice(indexTask, 1)
    this.persistData()
  }

  deleteAll() {
    this.tasks = []
    this.persistData()
  }

  deleteAllCompleted() {
    const allIdsToDelete = this.tasks
      .filter(task => task.isChecked)
      .map(task => task.id)
    allIdsToDelete.forEach(idTask => this.deleteTask(idTask))
    this.persistData()
  }

  checkTask(id) {
    const indexTask = this.tasks.findIndex(cur => id === cur.id)
    const task = this.tasks[indexTask]
    task.toggleCheck()
    this.persistData()
  }

  getTaskDescription(id) {
    const task = this.tasks.find(elem => elem.id === id)
    return task.description
  }

  updateDescription(id, newDescription) {
    this.tasks.find(task => task.id === id).setDescription(newDescription)
    this.persistData()
  }

  loadStorage() {
    const backup = localStorage.getItem('todolist')
    if (!backup) return
    let objectList = JSON.parse(backup)
    objectList.forEach(obj => {
      this.tasks.push(new Task(obj.id, obj.description, obj.isChecked))
    })
  }

  persistData() {
    localStorage.setItem('todolist', JSON.stringify(this.tasks))
  }
}
