import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {stringify} from "uuid/index";

export type FilterValuesType = "all" | "completed" | "active"
type TodolistsType = { id: string, title: string, filter: FilterValuesType }

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'completed'},//0
        // {id: todolistID2, title: 'What to buy', filter: 'all'},//1
    ])
    // let [tasks1, setTasks1] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false}
    // ])
    let [tasks1, setTasks1] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    // let [tasks1, setTasks1] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false}
    // ])
    // console.log(tasks1)
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks1({...tasks1, [todolistId]: tasks1[todolistId].filter(el => el.id !== taskId)})
        // let filteredTasks = tasks1.filter(t => id !== t.id)
        // setTasks1(filteredTasks)
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks1({...tasks1, [todolistId]: [...tasks1[todolistId], newTask]})
        // let newTasksArray = [newTask, ...tasks1]
        // setTasks1(newTasksArray)
    }
    const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks1({
            ...tasks1,
            [todolistId]: tasks1[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
        // let task = tasks1.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks1([...tasks1])
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
        // setFilter(value)
    }
    // let tasksForTodolist = tasks1;
    // if (filter === "completed") {
    //     tasksForTodolist = tasks1.filter(t => t.isDone === true)
    // }
    // if (filter === "active") {
    //     tasksForTodolist = tasks1.filter(t => t.isDone === false)
    // }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id == todolistId))
        delete tasks1[todolistId]
    }
    return (
        <div>
            {todolists.map((el) => {
                    let tasksForTodolist = tasks1[el.id];
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks1[el.id].filter(t => t.isDone === true)
                    }
                    if (el.filter === "active") {
                        tasksForTodolist = tasks1[el.id].filter(t => t.isDone === false)
                    }
                    return (
                        <TodoList
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            filter={el.filter}
                        />
                    )
                })}


        </div>
    );
}

export default App;
