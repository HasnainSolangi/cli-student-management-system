## Student Management System 🎓

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

### Objectives and More 🚀

The Student Management System aims to provide a user-friendly interface for managing student records efficiently. It offers functionalities such as enrolling students in courses, tracking student balances, and processing fee payments. The system also allows users to view detailed information about enrolled students, including their course enrollments and current balances.