# Todo Application

This Todo application is a simple project built using React, Material-UI, and React Router. It allows users to add, edit, delete, and mark tasks as done. The application also includes a date picker for selecting task due dates.

## Features

- **Add Todo**: Users can add new tasks with a name, description, and due date.
- **Edit Todo**: Existing tasks can be edited to update their details.
- **Delete Todo**: Users can delete tasks they no longer need.
- **Mark as Done**: Tasks can be marked as done, and once marked, they can no longer be edited or deleted.
- **Search**: Users can search tasks by their names.
- **Responsive Design**: The application is responsive and adapts to different screen sizes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for building responsive applications.
- **React Router**: A library for routing in React applications.
- **@mui/x-date-pickers**: A package for adding date and time pickers.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pratu2604/Todo-List.git

2. Navigate to the project directory:

    cd todo-app

3. Install the dependencies:

    npm install

4. Start the development server:

    npm start

The application will be available at http://localhost:3000.

## Project Structure
    *App.js*: The main component that handles routing and manages the state of todos.
    *components/TodoList.js*: Displays the list of tasks and provides actions to edit, delete, and mark tasks as done.
    *components/TodoForm.js*: A form component for adding and editing tasks.
    *todos.json*: A JSON file that serves as a mock database for loading initial todo data.

## Usage
    *Adding a Task*: Click the "Add Todo" button, fill out the form, and click "Add Task".
    *Editing a Task*: Click the "Edit" button next to the task you want to modify, update the details, and click "Update Task".
    *Deleting a Task*: Click the "Delete" button next to the task you want to remove.
    *Marking as Done*: Click the "Mark as Done" button next to a task to mark it as complete. This will disable further edits or deletion.


## Dependencies
    React
    React Router DOM
    Material-UI (MUI)

## License
    This project is licensed under the MIT License.

## Contact
    For any issues or questions, please contact pratikshanimbalkar2722@gmail.com