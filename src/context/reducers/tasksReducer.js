/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// Constants
import { status } from "../../constants/enums";


const initialState = {
    // Storing a Data in a Local Storage
    tasks: [],
    pendingTasks: [],
    completedTasks: [],
    deployedTasks: [],
    defferedTasks: [],
    inProgressTasks: [],
    recoverTasks: [],
    isFilterApplied: false,
}

// Initialize a Tasks

const initialTasksFn = (state, action) => {
    if (action.payload)
        state.tasks = action.payload;
}


// To Add A Task To the Function
const addTaskFn = (state, action) => {
    const date = new Date();
    const newTask = {
        title: action.payload.title,
        description: action.payload.description,
        status: status.pending,
        assignee: action.payload.assignee,
        priority: action.payload.priority,
        id: action.payload.title + action.payload.description + action.payload.assignee,
        createdAt: parseInt(
            date.getFullYear() + "" +
            (date.getMonth() + 1) + "" +
            date.getDate()
        ),
        updatedAt: '',
        completedAt: '',
        team: action.payload.team,
    };
    state.tasks = [...state.tasks, newTask];
}

// To Edit the Task only priority and Status allowed
const editTaskFn = (state, action) => {
    const date = new Date();
    state.tasks = state.tasks.map(
        task => {
            // ------ 
            if (task.id === action.payload.id) {
                return {
                    ...task,
                    priority: action.payload.priority || task.priority,
                    status: action.payload.status || task.status,
                    updatedAt: parseInt(
                        date.getFullYear() + "" +
                        (date.getMonth() + 1) + "" +
                        date.getDate()
                    ),
                    completedAt: action.payload.status === status.completed
                        ? parseInt(
                            date.getFullYear() + "" +
                            (date.getMonth() + 1) + "" +
                            date.getDate()
                        ) : ''
                }
            }
            // ------
            return task;
        }
    );
}

// To Edit the Task Using Id
const deleteTaskFn = (state, action) => {
    state.tasks = state.tasks.filter(task => task.id !== action.payload);
}

// To Filter the Tasks
const getAllFilterTasksFn = (state, action) => {
    state.recoverTasks = state.tasks;
    state.tasks = state.tasks.filter(
        task =>
            // To Filter the Assignee with name
            (
                action.payload.assigneeName ?
                    task.assignee.toLowerCase()
                        .includes(action.payload.assigneeName.toLowerCase())
                    : true
            )
            // To Filter the task priority
            && (
                action.payload.priority
                    ? action.payload.priority === task.priority
                    : true
            )
            // To Filter the Task with a Date Range
            && (
                (action.payload.filteredDate)
                    ? task.createdAt >= action.payload.filteredDate : true
            )

    );
    state.isFilterApplied = true;
}

// To Seperate the Categoires
const categoriesTasksFn = (state, _) => {
    state.completedTasks = state.tasks.filter(task => task.status === status.completed);
    state.inProgressTasks = state.tasks.filter(task => task.status === status.inProgress);
    state.pendingTasks = state.tasks.filter(task => task.status === status.pending);
    state.deployedTasks = state.tasks.filter(task => task.status === status.deployed);
    state.defferedTasks = state.tasks.filter(task => task.status === status.deffred);
}

// Reset The filter Tasks
const resetTasksFn = (state, _) => {
    state.tasks = state.recoverTasks;
    state.recoverTasks = [];
    state.isFilterApplied = false;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        initialTasks: initialTasksFn,
        addTask: addTaskFn,
        editTask: editTaskFn,
        deleteTask: deleteTaskFn,
        categoriesTasks: categoriesTasksFn,
        getAllFilterTasks: getAllFilterTasksFn,
        resetTasks: resetTasksFn,
    }
})

// Action Exports
export const {
    addTask,
    deleteTask,
    editTask,
    categoriesTasks,
    getAllFilterTasks,
    resetTasks,
    initialTasks,
} = tasksSlice.actions;


// Selector Exports
export const getAllTasks = (state) => state.tasks.tasks;
export const getCompletedTasks = (state) => state.tasks.completedTasks;
export const getInProgressTasks = (state) => state.tasks.inProgressTasks;
export const getPendingTasks = (state) => state.tasks.pendingTasks;
export const getDeployedTasks = (state) => state.tasks.deployedTasks;
export const getDefferdTasks = (state) => state.tasks.defferedTasks;
export const getIsFilterApplied = (state) => state.tasks.isFilterApplied;


export default tasksSlice.reducer;