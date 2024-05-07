#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

// Student class
class Student {
  name: string;
  id: string;
  enrolledCourses: string[];
  balance: number;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.enrolledCourses = [];
    this.balance = 10000;
  }

  // Getters and setters
  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }

  getEnrolledCourses(): string[] {
    return this.enrolledCourses;
  }

  getBalance(): number {
    return this.balance;
  }

  // Methods
  enrollCourse(course: string) {
    this.enrolledCourses.push(course);
  }

  payFees(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Paid $${amount} in fees. Remaining balance: $${this.balance}`);
    } else {
      console.log(`Insufficient balance to pay $${amount}.`);
    }
  }
}

// Course class
class Course {
  name: string;
  description: string;
  price: number;

  constructor(name: string, description: string, price: number) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  // Getters
  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }
}

// Define courses
const courses: Course[] = [
  new Course("Web Development Course", "HTML CSS JavaScript", 100),
  new Course("TypeScript Course", "Comprehensive TypeScript course", 85),
  new Course("Python Degree Course", "Complete Python degree program", 1000),
  new Course("Java Degree Course", "Comprehensive Java degree program", 5000),
  new Course("Kotlin Course", "Introduction to Kotlin", 50)
];


console.log(chalk.bgBlue('\n Welcome to Student Management System'));

const students: Student[] = [];

const mainMenu = async () => {
  console.log('-------------------------------------');
  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Choose an option',
    choices: [
      'Add student',
      'Enroll Student',
      'View student balance',
      'Pay student fees',
      'Show student status',
      'Exit'
    ]
  });

  switch (choice) {
    case 'Add student':
      await addStudent();
      break;
    case 'Enroll Student':
      await enrollStudent();
      break;
    case 'View student balance':
      await viewStudentBalance();
      break;
    case 'Pay student fees':
      payStudentFees();
      break;
    case 'Show student status':
      showStudentStatus();
      break;
    case 'Exit':
      thankYouMessage(); // Call the thankYouMessage function after exiting
      process.exit(0);
  }
};


const generateStudentID = () => {
  let id = '';
  const characters = '0123456789';
  for (let i = 0; i < 5; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};
const addStudent = async () => {
  const studentDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter student name:'
    }
  ]);
  // Generate a unique student ID
  const id = generateStudentID();

  const newStudent = new Student(studentDetails.name, id);
  students.push(newStudent);
  console.log(`Student ${studentDetails.name} with ID ${id} added successfully.`);
  mainMenu();
};

const enrollStudent = async () => {

  if (students.length === 0) {
    console.log(chalk.red('No students available to enroll.'));
    return mainMenu();
  }
  const { studentId } = await inquirer.prompt({
    type: 'list',
    name: 'studentId',
    message: 'Choose a student to enroll:',
    choices: students.map(student => ({ name: student.getName(), value: student.getId() }))
  });

  const selectedStudent = students.find(student => student.getId() === studentId);

  if (!selectedStudent) {
    console.log(chalk.red('Selected student not found.'));
    return mainMenu();
  }

  // Prompt the user to choose a course from the list
  const { chosenCourse } = await inquirer.prompt({
    type: 'list',
    name: 'chosenCourse',
    message: 'Choose a course to enroll in:',
    choices: courses.map(course => ({ name: `${course.getName()} - $${course.getPrice()}`, value: course }))
  });

  // Ensure the selected course is an instance of Course
  if (!(chosenCourse instanceof Course)) {
    console.log(chalk.red('Invalid course selection.'));
    return mainMenu();
  }

  // Deduct course fee from the student's balance
  const courseFee = chosenCourse.getPrice(); // Get the price of the selected course
  if (selectedStudent.getBalance() < courseFee) {
    console.log(chalk.red(`Insufficient balance to pay $${courseFee}.`));
    return mainMenu();
  }

  // Enroll the student in the selected course
  selectedStudent.enrollCourse(chosenCourse.getName());
  console.log(`Student with ID ${studentId} enrolled in ${chosenCourse.getName()} successfully.`);

  // Deduct the course fee from the student's balance
  selectedStudent.payFees(courseFee);
  mainMenu();
};
const viewStudentBalance = async () => {
  // Check if there are no students enrolled
  if (students.length === 0) {
    console.log(chalk.yellow('No students enrolled to display balance.'));
    mainMenu(); // Return to the main menu
    return; // Exit the function
  }

  // Prompt the user to choose a student
  const { studentId } = await inquirer.prompt({
    type: 'list',
    name: 'studentId',
    message: 'Choose a student to view balance:',
    choices: students.map(student => ({ name: `${student.getName()} (${student.getId()})`, value: student.getId() }))
  });

  // Find the selected student
  const selectedStudent = students.find(student => student.getId() === studentId);

  if (selectedStudent) {
    // If the selected student is found, display their balance
    console.log(`Student Name: ${selectedStudent.getName()}`);
    console.log(`Balance: $${selectedStudent.getBalance()}`);
  } else {
    // If the selected student is not found, display an error message
    console.log('Student not found.');
  }
  mainMenu();
};


const payStudentFees = async () => {
  // Check if there are no students enrolled
  if (students.length === 0) {
    console.log(chalk.yellow('No students enrolled.'));
    mainMenu(); // Return to the main menu
    return; // Exit the function
  }
  // Prompt the user to choose a student first
  const { studentId } = await inquirer.prompt({
    type: 'list',
    name: 'studentId',
    message: 'Choose a student to pay fees:',
    choices: students.map(student => ({ name: student.getName(), value: student.getId() }))
  }) as { studentId: string };

  // Find the selected student
  const selectedStudent = students.find(student => student.getId() === studentId);

  // If the selected student is not found, display an error message and return to the main menu
  if (!selectedStudent) {
    console.log(chalk.red('Selected student not found.'));
    return mainMenu();
  }

  // Prompt the user to choose the type of fees to pay
  const { feeType } = await inquirer.prompt({
    type: 'list',
    name: 'feeType',
    message: 'Choose the type of fees to pay:',
    choices: ['Course Fees', 'Monthly Fees']
  }) as { feeType: string };

  // Based on the selected fee type, calculate the amount to pay
  let amountToPay = 0;
  let feeDescription = '';
  if (feeType === 'Course Fees') {
    const { chosenCourse } = await inquirer.prompt({
      type: 'list',
      name: 'chosenCourse',
      message: 'Choose a course to pay fees for:',
      choices: courses.map(course => ({ name: `${course.getName()} - $${course.getPrice()}`, value: course }))
    }) as { chosenCourse: Course };
    amountToPay = chosenCourse.getPrice();
    feeDescription = chosenCourse.getName(); // Set feeDescription to only the course name
  } else if (feeType === 'Monthly Fees') {
    amountToPay = 25; // Monthly fee is $25
    feeDescription = 'Monthly Fee';
  }

  // Check if the student has sufficient balance to pay the fees
  if (selectedStudent.getBalance() < amountToPay) {
    console.log(chalk.red(`Insufficient balance for ${selectedStudent.getName()} to pay $${amountToPay}.`));
  } else {
    // If the balance is sufficient, pay the fees and display the remaining balance
    console.log(`Student with ID ${selectedStudent.getId()} paid ${feeDescription} successfully.`);
    selectedStudent.payFees(amountToPay);
  }
  // Return to the main menu
  mainMenu();
};


const showStudentStatus = async () => {
  // Check if there are no students enrolled
  if (students.length === 0) {
    console.log(chalk.yellow('No students enrolled.'));
    mainMenu(); // Return to the main menu
    return; // Exit the function
  }

  // Prompt the user to choose a student
  const { studentId } = await inquirer.prompt({
    type: 'list',
    name: 'studentId',
    message: 'Choose a student to view status:',
    choices: students.map(student => ({ name: student.getName(), value: student.getId() }))
  });

  console.log(chalk.green('Student Status'));

  // Find the selected student
  const selectedStudent = students.find(student => student.getId() === studentId);

  // If the selected student is found, display their status
  if (selectedStudent) {
    console.log(`Student Name: ${selectedStudent.getName()}`);
    console.log(`Student ID: ${selectedStudent.getId()}`);
    console.log(`Enrolled Courses: ${selectedStudent.getEnrolledCourses().join(', ')}`);
    console.log(`Balance: $${selectedStudent.getBalance()}`);
  } else {
    // If the selected student is not found, display an error message
    console.log('Student not found.');
  }

  mainMenu();
};

const thankYouMessage = () => {
  console.log('Thank you for using the Student Management System!');
};
mainMenu();
