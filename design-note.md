# Study Group Finder – Design Note and WDLC Plan

**CS 344 Web Engineering | Fall 2026 | Assignment 1**
**Assigned Idea:** 06 – Study Group Finder
**Due Date:** Friday, 30 October 2026
**Total Marks:** 30

---

## 1. Planning

### 1.1 Problem Description

Students often look for study partners when preparing for quizzes, midterms and final exams. Usually, they depend on WhatsApp groups or ask their classmates, which makes it difficult to find a suitable study group. They may not know when a group meets, where the meeting takes place or whether there are any seats available.

The Study Group Finder will make this process easier by allowing students to view available groups, check their meeting details and join a group that suits their schedule. Students will also be able to create their own groups if they cannot find a suitable one.

### 1.2 Target Users

The application is mainly intended for university students, particularly undergraduate students who want to study with others taking the same courses.

For example, a SEECS student preparing for an upcoming exam could use the application to find classmates studying the same subject. Since students may access it between classes or from home, the website should work properly on both mobile phones and computers.

### 1.3 Project Goals

The main purpose of this application is to make finding and joining study groups simple. It should allow students to:

- Find a suitable study group without spending too much time searching.
- Check the meeting day, time, location and available seats.
- Avoid joining groups that are already full.
- Prevent joining two groups that have overlapping schedules.
- Create a new study group through a simple form.

### 1.4 How the Application Will Work

When a student opens the website, they will see a list of available study groups. They can search for a particular course or use filters to narrow down the results by course, day and meeting mode.

Each group will display its important details, including its title, meeting time, location and remaining seats. Students can join a group if seats are available and they do not already have another group at the same time.

If none of the existing groups suits their needs, they can use the creation form to start a new group.

### 1.5 Project Scope

For this assignment, I will focus on the basic functionality of the application using HTML, CSS and JavaScript.

The website will include group browsing, searching, filtering, joining and leaving groups, along with a form for creating new groups. It will also have a responsive layout for mobile, tablet and desktop screens.

Features such as user accounts, permanent data storage, messaging and notifications will not be included in this version. These can be introduced in the later assignments when the application is connected to a backend.

### 1.6 Requirements and Limitations

The application must follow the requirements given in the assignment brief:

- Only HTML, CSS and vanilla JavaScript will be used.
- Frameworks such as React and CSS libraries will not be used.
- The application must work without a backend.
- At least six sample study groups must be included.
- The website must have at least two responsive breakpoints.
- It must include at least two working user interactions.
- The code should be written and understood by me rather than using a copied website template.

Since there is no login system in this version, all actions will be performed using one predefined user named "You". The data will also reset when the page is refreshed because permanent storage is not part of this assignment.

To keep the scheduling logic simple, each meeting will be treated as a one-hour time slot.

---

## 2. Analysis

### 2.1 Functional Requirements

The application should provide the following features:

1. Display all available study groups using records stored in a JavaScript array.
2. Allow students to filter groups by course, day and meeting mode.
3. Provide a search option for finding groups by course name or title.
4. Display a message when no groups match the selected filters.
5. Allow students to join groups and update the available seat count.
6. Prevent students from joining a full group or joining the same group more than once.
7. Check for schedule clashes before allowing a student to join or create a group.
8. Allow students to leave groups they have already joined.
9. Provide a form for creating new study groups.
10. Validate the form and display clear messages when the entered information is incorrect.
11. Show the number of groups currently displayed and the total number of available seats.

### 2.2 Non-Functional Requirements

Apart from the main features, the application should also be easy to use and maintain.

The layout should adjust properly to different screen sizes. HTML elements should be used according to their purpose, and every form field should have a proper label. Keyboard navigation and visible focus indicators should also be supported.

The code should be divided into separate HTML, CSS and JavaScript files. I will use CSS variables for commonly used colours and spacing values to keep the styling consistent.

The website should load quickly without depending on external libraries. Any AI assistance or reused resources will also be mentioned in the project documentation.

### 2.3 User Stories

Some common situations in which students may use the application are:

- A student wants to find a group for a particular course without going through multiple WhatsApp groups.
- A student wants to check how many seats are available before joining.
- A student wants to avoid joining two groups that meet at the same time.
- A student cannot find a suitable group and decides to create one.
- A student accesses the website from a mobile phone and wants to use all its features without zooming in.

### 2.4 Data Structure

Each study group will be stored as an object inside a JavaScript array. Every object will contain the following information:

| Field    | Description                  | Example                  |
| -------- | ---------------------------- | ------------------------ |
| id       | Unique ID of the group       | 1                        |
| course   | Course name or code          | CS 344                   |
| title    | Name of the study session    | Web Engineering Revision |
| day      | Meeting day                  | Tuesday                  |
| time     | Meeting time                 | 16:00                    |
| mode     | Online or on-campus meeting  | On campus                |
| location | Meeting place or online link | SEECS Library            |
| capacity | Maximum number of members    | 5                        |
| members  | Names of students who joined | Ayesha, Bilal            |

The number of remaining seats will not be stored separately. Instead, JavaScript will calculate it by subtracting the number of members from the group's total capacity.

The application will mainly work with three things: the list of groups, the current user and the selected search and filter options.

### 2.5 Form Validation

The create-group form will use HTML validation wherever possible. JavaScript will handle additional checks that cannot be covered by basic HTML attributes.

The course, day, time, mode and location fields will be required. The group title must contain between 5 and 60 characters. Capacity must be a whole number between 2 and 12.

I will also check that the title is not made up of spaces and that another group with the same course, day, time and location does not already exist.

If something is incorrect, the application should explain the problem without clearing the information already entered by the student.

### 2.6 Sample Groups

I will create at least six sample group records myself to test the different features of the application.

The sample data will include at least four different courses, different meeting days and both online and on-campus groups.

I will also include groups with different seat availability, including one with plenty of seats, one with only one seat left and one that is completely full.

Some groups will share the same meeting day and time so that the schedule clash feature can be tested. At least one course will have only one available group to make sure the course filters work properly.

---

## 3. Design

### 3.1 Website Layout

The website will have a simple layout so students can find what they need without going through unnecessary pages.

At the top, there will be a header containing the application name and a short description. The main section will contain the search bar, filters and list of study groups. A separate section will contain the form for creating a new group.

At the bottom, I will add basic assignment information and the required AI assistance disclosure.

### 3.2 Mobile Layout

\<text>For screens smaller than 600px, the website will use a single-column layout. The search bar and filters will appear one below another, followed by the group cards. The create-group form will appear below the list.\</text>

```text
+------------------------+
| Study Group Finder     |
+------------------------+
| [Search...............]|
| [Course v] [Day v]     |
| [Mode v]   [Clear]     |
+------------------------+
| 5 groups, 12 seats open|
| +--------------------+ |
| | CS 344 - Web Eng   | |
| | Tue 16:00 | Campus | |
| | SEECS Library      | |
| | Seats left: 3      | |
| | [Join]             | |
| +--------------------+ |
|                        |
|       Other cards      |
|                        |
+------------------------+
| Create a Group         |
| Course  [............] |
| Title   [............] |
| Day [v]  Time [..:..]  |
| Mode [options]         |
| Location [...........] |
| Capacity [..]          |
| [Create Group]         |
+------------------------+
```

### 3.3 Tablet Layout

For tablet screens between 600px and 1023px, the group cards will be displayed in two columns. The search bar and filters will be arranged in a row where enough space is available.

The create-group form will use two columns to make better use of the available screen space.

### 3.4 Desktop Layout

On screens 1024px and wider, the website will use a three-column grid for the study group cards.

The create-group form will be placed in a separate column on the right side, while the group list will take up the remaining space.

This will allow students to browse existing groups and create a new one without having to scroll through the entire page.

### 3.5 Responsive Design

I will follow a mobile-first approach and use CSS media queries to adjust the layout.

- **Below 600px:** One column for the group cards and a vertically arranged form.
- **600px and above:** Two columns for the cards and a more compact filter section.
- **1024px and above:** Three columns for the cards, with the creation form on the right.

The layout will also be checked at different zoom levels to make sure the content remains accessible.

### 3.6 CSS Design

CSS Grid will mainly be used for arranging the group cards and the overall page layout. Flexbox will be useful for smaller elements such as the filter section and the contents of individual cards.

I will define commonly used colours, spacing, font sizes and border radius values using CSS variables. The `box-sizing: border-box` property will be applied globally to make element sizing easier to manage.

Buttons and input fields will have clear hover and focus styles. Full groups, joined groups and warning messages will also have visually different states.

I will try to maintain good text contrast and make buttons large enough to use comfortably on touchscreens.

### 3.7 JavaScript Functionality

JavaScript will handle most of the application's functionality, including displaying groups, applying filters, updating seat counts and processing form submissions.

To keep the code manageable, I will divide the functionality into smaller functions:

| Function                    | Purpose                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `renderGroups(list)`        | Displays the groups on the page.                                    |
| `getFilteredGroups()`       | Applies the selected filters and search text.                       |
| `updateSummary(list)`       | Updates the number of groups and available seats.                   |
| `seatsLeft(group)`          | Calculates the remaining seats.                                     |
| `hasClash(group)`           | Checks whether the current user has another group at the same time. |
| `joinGroup(id)`             | Handles joining a group after checking the conditions.              |
| `leaveGroup(id)`            | Removes the current user from a group.                              |
| `validateNewGroup(data)`    | Checks the entered information before creating a group.             |
| `handleCreateSubmit(event)` | Handles submission of the create-group form.                        |
| `showMessage(text, type)`   | Displays success, warning and error messages.                       |

The search bar will respond to the `input` event, while the filter options will use `change` events. Buttons will use `click` events, and the create-group form will be handled through its `submit` event.

### 3.8 Joining and Leaving Groups

When a student clicks the Join button, JavaScript will first find the selected group using its ID.

Before adding the student, the application will check whether they have already joined that group, whether any seats are available and whether they have another group scheduled for the same day and time.

If all conditions are satisfied, the student's name will be added to the members array and the page will update the seat count.

If any condition is not satisfied, the application will display an appropriate message instead.

Students will also be able to leave groups they have joined. Their names will be removed from the members array, and the freed seat will become available again.

### 3.9 Other Important Cases

I will also make sure the application handles situations such as:

- No groups matching the selected filters.
- Trying to join a group that is already full.
- Attempting to join the same group twice.
- Trying to join two groups with the same meeting time.
- Entering only spaces in the title field.
- Creating a group with an invalid capacity.
- Creating another group with identical details.
- Leaving a group that the current user has not joined.

---

## 4. Development

### 4.1 Project Files

The project will be divided into three main files so that the HTML structure, styling and JavaScript logic remain separate.

```text
study-group-finder/
│
├── index.html
├── style.css
├── script.js
├── design-note.md
├── README.md
│
└── screenshots/
    ├── mobile.png
    ├── tablet.png
    └── desktop.png
```

### 4.2 Development Process

I will build the application gradually rather than trying to implement everything at once.

First, I will prepare the sample group records and check that they are correctly stored in the JavaScript array. After that, I will create the HTML structure, including the header, filters, group section and creation form.

Once the basic structure is ready, I will work on the CSS, starting with the mobile layout and then adding the tablet and desktop media queries.

After the design is complete, I will implement the JavaScript functionality. This will start with displaying the group cards, followed by searching, filtering and updating the summary.

The joining, leaving and schedule clash checks will be implemented next. Finally, I will connect the creation form to JavaScript and add the required validation.

I will test the application after completing each major part and commit my changes to GitHub regularly with meaningful commit messages.

---

## 5. Testing

### 5.1 Functional Testing

I will test the main features of the application using different situations to make sure they work as expected.

| Test | Action                                           | Expected Result                                       |
| ---- | ------------------------------------------------ | ----------------------------------------------------- |
| T1   | Open the website                                 | All sample groups appear with the correct summary.    |
| T2   | Select a course                                  | Only groups for that course appear.                   |
| T3   | Select a day and mode                            | Only matching groups are displayed.                   |
| T4   | Search for a word in a title                     | Matching groups appear regardless of letter case.     |
| T5   | Apply filters with no matching results           | A friendly message is displayed.                      |
| T6   | Click Clear Filters                              | All groups appear again.                              |
| T7   | Join a group with available seats                | Seat count decreases and the button changes to Leave. |
| T8   | Join the last available seat                     | The group becomes full.                               |
| T9   | Open a full group                                | Join is disabled and Full is displayed.               |
| T10  | Join two groups at the same time                 | The second attempt is blocked with a warning.         |
| T11  | Leave a joined group                             | The seat becomes available again.                     |
| T12  | Submit an empty form                             | Browser validation prevents submission.               |
| T13  | Enter only spaces as the title                   | JavaScript displays an error.                         |
| T14  | Enter capacity as 1 or 50                        | The application rejects the value.                    |
| T15  | Create a duplicate group                         | A warning is displayed.                               |
| T16  | Submit a valid group                             | The new group appears and the summary updates.        |
| T17  | Create a group that clashes with an existing one | The application prevents its creation.                |

### 5.2 Responsive Testing

I will check the website at three different screen widths:

- **360px:** Make sure the website fits a mobile screen without horizontal scrolling.
- **768px:** Check that the two-column card layout and filters work properly.
- **1280px:** Check the three-column card layout and the form on the right side.

I will also test the website at 200% browser zoom to make sure the content remains usable.

### 5.3 Accessibility Testing

I will check that all form fields have labels and that the page uses proper HTML headings and semantic elements.

The website should also be usable through keyboard navigation, with a visible focus indicator when moving between elements using the Tab key.

Success and error messages will use an accessible live region so that screen readers can announce important updates. I will also check that information is not communicated through colour alone.

Finally, I will run Lighthouse through Chrome DevTools and include the accessibility results in the README file.

---

## 6. Deployment

After completing and testing the application, I will create a public GitHub repository for the project.

All project files will be pushed to the repository, making sure that no private information or unnecessary files are included.

If time permits, I will also use GitHub Pages to publish the website so that it can be accessed through a live link.

The README file will contain the project description, its main features, instructions for running it, screenshots of the different layouts and a brief explanation of the technologies used.

It will also include testing details and information about any AI assistance or external resources used during development.

---

## 7. Future Development and Maintenance

This assignment is the first version of the Study Group Finder. The application will be developed further in the next two assignments.

In Assignment 2, the application will be connected to a PHP backend. Study group information will be stored in a SQLite or MySQL database instead of a JavaScript array. Fetch will be used to communicate with PHP endpoints, and the application will also include server-side validation and session handling.

In Assignment 3, the application will be rebuilt using the MERN stack. React will be used for the frontend, Express and Node.js for the backend, and MongoDB for storing the data. Authentication and user roles will also be introduced, along with one additional feature.

Although the technologies will change, the main purpose and workflow of the application will remain the same. Keeping the data structure organised from the beginning will make these changes easier.

---

## 8. Browser-Side and Server-Side Functionality

For the current assignment, all the main operations will take place inside the browser.

| Browser-side functionality            | Server-side functionality (future assignments) |
| ------------------------------------- | ---------------------------------------------- |
| Displaying study groups               | Permanent data storage                         |
| Searching and filtering               | Sharing groups between students                |
| Joining and leaving groups            | Real user accounts                             |
| Checking schedule clashes             | Server-side validation                         |
| Validating form input                 | Database management                            |
| Storing records in a JavaScript array | Managing shared application data               |

Since this version does not use a backend or database, any changes made by the user will be lost after refreshing the page. This is an expected limitation of the first assignment.

---

## 9. Rubric and Marks Distribution

The assignment carries a total of 30 marks. I will focus on the following areas while developing the application:

| Assessment Area                |  Marks | Planned Work                                                    |
| ------------------------------ | -----: | --------------------------------------------------------------- |
| Application functionality      |     10 | Searching, filtering, joining, leaving and creating groups.     |
| HTML and accessibility         |      5 | Semantic structure, proper forms, labels and validation.        |
| CSS and responsive design      |      7 | Grid, Flexbox, CSS variables and responsive layouts.            |
| JavaScript                     |      5 | DOM manipulation, events, application logic and error handling. |
| Documentation and presentation |      3 | GitHub repository, README, design note and project walkthrough. |
| **Total**                      | **30** |                                                                 |

---

## 10. Final Checklist

Before submitting the assignment, I will make sure that:

- [ ] The instructor's assigned rule has been added to the documentation.
- [ ] At least six sample groups are included.
- [ ] Searching and all filters work correctly.
- [ ] Joining, leaving and schedule clash checks work properly.
- [ ] The create-group form validates the entered information.
- [ ] All functional test cases have been checked.
- [ ] The mobile, tablet and desktop layouts have been tested.
- [ ] Screenshots of all three layouts have been added.
- [ ] The README file contains the required information.
- [ ] The project has been pushed to GitHub.
- [ ] AI assistance and any reused resources have been disclosed.
- [ ] I can explain the code and make a small change during the project walkthrough.

---

## 11. Project Walkthrough Preparation

During the project demonstration, I should be able to explain how the main features work rather than just showing the finished website.

I will pay particular attention to explaining how the search and filters work together, how the application checks for schedule clashes and how joining or leaving a group changes the available seats.

I should also understand how the CSS media queries change the layout on different devices.

Some possible changes during the demonstration could include adding a new field, changing a breakpoint, modifying a validation rule or adding another filter option. I will make sure I understand the relevant parts of the code so I can make these changes if required.

---

## 12. AI Assistance Disclosure

Claude (Anthropic's AI assistant) was used for help with planning the project and preparing the initial design note and code structure. I reviewed and tested the application and will make sure I understand the code and its functionality.