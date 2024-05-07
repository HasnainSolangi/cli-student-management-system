## Student Management System 🎓

**CMD:-** `npx cli-student-management-system-tool`

### Overview ℹ️

The Student Management System is a command-line application written in TypeScript that allows users to manage student records, enroll students in courses, view student balances, pay student fees, and display student status.

### Code Breakdown 🛠️

#### Classes

- **Student**: Represents a student with properties for name, ID, enrolled courses, and balance.
- **Course**: Represents a course with properties for name, description, and price.

#### Data

- **courses**: An array containing pre-defined Course objects.
- **students**: An empty array to store instances of the Student class.

#### Functions

- **mainMenu**: Displays the main menu and handles user choices. Calls other functions based on user selection.
- **thankYouMessage**: Prints a thank you message upon exiting the application.
- **addStudent**: Prompts the user to enter a student name, generates a random ID, creates a new student object with an initial balance of $10,000, adds it to the students array, and displays a success message.
- **generateStudentID**: Generates a random 5-digit student ID.
- **enrollStudent**: Checks for available students, prompts for student selection, prompts for course selection, deducts course fee if sufficient balance, enrolls student in the course, and displays success messages.
- **viewStudentBalance**: Prompts for student selection, finds the student, and displays their name and balance.
- **payStudentFees**: Prompts for student selection, prompts for fee type (course fees or monthly fees), calculates the amount to pay, deducts the fee from the student's balance, and displays success messages.
- **showStudentStatus**: Displays the name, ID, enrolled courses, and balance of each student.

#### Requirements for Development:

- To build a CLI-based Student Management System in TypeScript, you'll need:

- 1. Node.js: Install Node.js to execute TypeScript code in a server-side environment.
- 2. TypeScript Compiler: Install TypeScript globally or as a project dependency (npm install typescript) to compile TypeScript code into JavaScript.
- 3. Package Manager: NPM or Yarn to manage project dependencies and scripts (npm init to initialize a new project).
- 4. CLI Libraries: Utilize libraries like inquirer for creating interactive command-line interfaces.
- 5. Build Tools: Employ build tools like Webpack or TypeScript's native compilation to bundle and transpile TypeScript code.
- 6. Editor/IDE: A code editor or integrated development environment (IDE) such as Visual Studio Code for writing and debugging TypeScript code efficiently.

### Objectives and More 🚀

The Student Management System aims to provide a user-friendly interface for managing student records efficiently. It offers functionalities such as enrolling students in courses, tracking student balances, and processing fee payments. The system also allows users to view detailed information about enrolled students, including their course enrollments and current balances.

# CODE
![SMS project](https://github.com/HasnainSolangi/course-GIAIWMD-CCAGAIE/assets/156552529/fbaa6433-711b-4ddf-9283-8a291251351b)


#### Name:- Hasnain Ahmed 
#### Roll No:- 00310538
#### Quarter:- 1
#### Batch:- 1
#### City:- Karachi
#### Centre:- Sindh Governor House Karachi
#### Campus:- Main
#### Days/Time:- Wednesday 09:00 am - 12:00 pm
