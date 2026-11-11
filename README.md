# Study Group Finder

**CS 344 Web Engineering – Assignment 1**  
**Assigned Idea:** 06 – Study Group Finder  
**Live Demo:** https://hk8028844.github.io/group-study-finder/

Study Group Finder is a simple web application that helps students find and join study groups for their courses. Students can browse available groups, search and filter them, check meeting details and available seats, or create a new group if they cannot find a suitable one.

The project is built using HTML, CSS and vanilla JavaScript. It does not use any frameworks or require a backend.

## Problem

Students usually find study partners through WhatsApp groups or by asking their classmates. This can make it difficult to know which study groups are available, when they meet, where they meet and whether they still have space for new members.

This application brings all that information together in one place, making it easier for students to find a group that matches their course and schedule.

## Features

The application includes the following features:

- View available study groups in individual cards.
- Search groups by course name or group title.
- Filter groups by course, day and meeting mode.
- See the number of matching groups and available seats.
- Join a group or leave one that you have already joined.
- Prevent joining groups that are full.
- Warn about schedule clashes when joining or creating a group.
- Create new study groups using a form with input validation.
- Display a message when no groups match the search.
- Responsive layout for mobile, tablet and desktop screens.
- Keyboard-friendly controls, labelled form fields and screen-reader announcements.

## Running the Project

No installation or additional setup is required.

1. Clone or download the repository.
2. Open the project folder.
3. Double-click `index.html` or open it in any modern web browser.

The application will run directly in the browser.

## Project Structure

```text
study-group-finder/
│
├── index.html       Main page and form structure
├── style.css        Styling and responsive layout
├── script.js        Sample data and application functionality
├── design-note.md   Project planning and documentation
│
└── screenshots/
    ├── mobile.png
    ├── tablet.png
    └── desktop.png
```

## Screenshots

The application has been designed to work on different screen sizes.

| Mobile | Tablet | Desktop |
|---|---|---|
| [View Screenshot](screenshots/mobile.png) | [View Screenshot](screenshots/tablet.png) | [View Screenshot](screenshots/desktop.png) |

## How It Works

All the functionality runs in the browser using JavaScript. Study groups are stored in an array, and JavaScript handles displaying the groups, applying filters, managing members and validating new groups.

There is no database or backend in this version, so changes made during a session are lost when the page is refreshed.

Permanent storage, real user accounts and sharing groups between students will be added in the later assignments.

## Testing

I manually tested the application at different screen widths:

- 360px for mobile
- 768px for tablet
- 1280px for desktop

I also checked keyboard navigation and tested the main features, including searching, filtering, joining and leaving groups, full-group restrictions, schedule clashes and form validation.

The detailed test cases are included in `design-note.md`.

## AI Assistance Disclosure

Claude (Anthropic's AI assistant) was used to help with project planning and the initial drafts of the design note and application code. I reviewed and tested the application and worked through its functionality to understand how the different parts operate.

## Credits

No external libraries, frameworks, templates, fonts or images were used.