const currentUser = "You";
 
const groups = [
  { id: 1, course: "CS 344", title: "Web Engineering revision", day: "Tuesday", time: "16:00",
    mode: "On campus", location: "SEECS library, table 3", capacity: 5, members: ["Ayesha", "Bilal"] },
  { id: 2, course: "CS 344", title: "JavaScript practice night", day: "Thursday", time: "20:00",
    mode: "Online", location: "Google Meet (link in group chat)", capacity: 6, members: ["Hassan"] },
  { id: 3, course: "SE 315", title: "Cloud project planning", day: "Tuesday", time: "16:00",
    mode: "On campus", location: "SEECS cafeteria", capacity: 4, members: ["Sara", "Usman", "Zain"] },
  { id: 4, course: "CS 330", title: "OS midterm prep", day: "Wednesday", time: "14:00",
    mode: "On campus", location: "Room 105", capacity: 3, members: ["Omar", "Hira", "Dawood"] },
  { id: 5, course: "MT 331", title: "Probability problem solving", day: "Friday", time: "11:00",
    mode: "Online", location: "Zoom (link in group chat)", capacity: 8, members: ["Maryam", "Ali"] },
  { id: 6, course: "SE 315", title: "Exam revision circle", day: "Saturday", time: "10:00",
    mode: "On campus", location: "NUST central library", capacity: 5, members: ["Fatima"] }
];
 
let filters = { search: "", course: "", day: "", mode: "" };
let nextId = Math.max(...groups.map((g) => g.id)) + 1;
 
const messageBox = document.getElementById("message");
const summaryBox = document.getElementById("summary");
const groupList = document.getElementById("group-list");
 
const filterForm = document.getElementById("filter-form");
const searchInput = document.getElementById("search");
const courseFilter = document.getElementById("filter-course");
const dayFilter = document.getElementById("filter-day");
const modeFilter = document.getElementById("filter-mode");
const clearButton = document.getElementById("clear-filters");
 
const createForm = document.getElementById("create-form");
 
function seatsLeft(group) {
  return group.capacity - group.members.length;
}
 
function isMember(group) {
  return group.members.includes(currentUser);
}
 
function hasClash(group) {
  return groups.some(
    (other) =>
      other.id !== group.id &&
      isMember(other) &&
      other.day === group.day &&
      other.time === group.time
  );
}
 
function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = text ? type : "";
}
 
function getFilteredGroups() {
  const text = filters.search.trim().toLowerCase();
 
  return groups.filter((group) => {
    const matchesText =
      text === "" ||
      group.title.toLowerCase().includes(text) ||
      group.course.toLowerCase().includes(text);
    const matchesCourse = filters.course === "" || group.course === filters.course;
    const matchesDay = filters.day === "" || group.day === filters.day;
    const matchesMode = filters.mode === "" || group.mode === filters.mode;
 
    return matchesText && matchesCourse && matchesDay && matchesMode;
  });
}
 
function fillCourseOptions() {
  const selected = courseFilter.value;
  const courses = [...new Set(groups.map((g) => g.course))].sort();
 
  courseFilter.innerHTML = '<option value="">All courses</option>';
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseFilter.appendChild(option);
  });
  courseFilter.value = selected;
}
 
function createCard(group) {
  const left = seatsLeft(group);
  const joined = isMember(group);
 
  const card = document.createElement("article");
  card.className = "group-card";
  if (left === 0) card.classList.add("is-full");
  if (joined) card.classList.add("is-joined");
 
  const title = document.createElement("h3");
  title.textContent = group.title;
 
  const course = document.createElement("p");
  course.className = "course";
  course.textContent = group.course;
 
  const details = document.createElement("p");
  details.className = "details";
  details.textContent = `${group.day}, ${group.time} | ${group.mode} | ${group.location}`;
 
  const seats = document.createElement("p");
  seats.className = "seats";
  seats.textContent = `Seats left: ${left} of ${group.capacity}`;
  if (joined) seats.textContent += " (you are in this group)";
 
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.id = group.id;
  button.dataset.action = joined ? "leave" : "join";
  button.textContent = joined ? "Leave" : "Join";
 
  if (left === 0 && !joined) {
    button.disabled = true;
    button.textContent = "Full";
  }
  button.setAttribute("aria-label", `${button.textContent}: ${group.title}`);
 
  card.append(title, course, details, seats, button);
  return card;
}
 
function updateSummary(list) {
  const openSeats = list.reduce((total, group) => total + seatsLeft(group), 0);
  const groupWord = list.length === 1 ? "group" : "groups";
  const seatWord = openSeats === 1 ? "seat" : "seats";
  summaryBox.textContent = `${list.length} ${groupWord} found, ${openSeats} ${seatWord} open`;
}
 
function renderGroups() {
  const list = getFilteredGroups();
  groupList.innerHTML = "";
 
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No groups match your filters. Try clearing them, or create a new group below.";
    groupList.appendChild(empty);
  } else {
    list.forEach((group) => groupList.appendChild(createCard(group)));
  }
 
  updateSummary(list);
}
 
function joinGroup(id) {
  const group = groups.find((g) => g.id === id);
  if (!group) return;
 
  if (isMember(group)) {
    showMessage("You have already joined this group.", "warning");
    return;
  }
  if (seatsLeft(group) === 0) {
    showMessage("This group is full.", "error");
    return;
  }
  if (hasClash(group)) {
    showMessage(`Time clash: you already have a group on ${group.day} at ${group.time}.`, "warning");
    return;
  }
 
  group.members.push(currentUser);
  renderGroups();
  showMessage(`You joined "${group.title}".`, "success");
}
 
function leaveGroup(id) {
  const group = groups.find((g) => g.id === id);
  if (!group || !isMember(group)) return;
 
  group.members = group.members.filter((name) => name !== currentUser);
  renderGroups();
  showMessage(`You left "${group.title}".`, "success");
}
 
function validateNewGroup(data) {
  if (data.course === "") return "Course cannot be empty.";
  if (data.title.length < 5) return "Title must be at least 5 characters (spaces do not count).";
  if (data.location === "") return "Location cannot be empty.";
  if (!Number.isInteger(data.capacity) || data.capacity < 2 || data.capacity > 12) {
    return "Capacity must be a whole number from 2 to 12.";
  }
 
  const duplicate = groups.some(
    (g) =>
      g.course.toLowerCase() === data.course.toLowerCase() &&
      g.day === data.day &&
      g.time === data.time &&
      g.location.toLowerCase() === data.location.toLowerCase()
  );
  if (duplicate) return "A group with the same course, day, time and location already exists.";
 
  const clash = groups.some((g) => isMember(g) && g.day === data.day && g.time === data.time);
  if (clash) return `You already have a group on ${data.day} at ${data.time}.`;
 
  return "";
}
 
function handleCreateSubmit(event) {
  event.preventDefault();
 
  const formData = new FormData(createForm);
  const data = {
    course: formData.get("course").trim(),
    title: formData.get("title").trim(),
    day: formData.get("day"),
    time: formData.get("time"),
    mode: formData.get("mode"),
    location: formData.get("location").trim(),
    capacity: Number(formData.get("capacity"))
  };
 
  const error = validateNewGroup(data);
  if (error) {
    showMessage(error, "error");
    return;
  }
 
  groups.push({ id: nextId, ...data, members: [currentUser] });
  nextId++;
 
  createForm.reset();
  fillCourseOptions();
  filterForm.reset();
  updateFilters();
  showMessage(`Group "${data.title}" created. You are its first member.`, "success");
}
 
function updateFilters() {
  filters.search = searchInput.value;
  filters.course = courseFilter.value;
  filters.day = dayFilter.value;
  filters.mode = modeFilter.value;
  showMessage("");
  renderGroups();
}
 
searchInput.addEventListener("input", updateFilters);
[courseFilter, dayFilter, modeFilter].forEach((select) =>
  select.addEventListener("change", updateFilters)
);
 
filterForm.addEventListener("submit", (event) => event.preventDefault());
 
clearButton.addEventListener("click", () => {
  filterForm.reset();
  updateFilters();
});
 
groupList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
 
  const id = Number(button.dataset.id);
  if (button.dataset.action === "join") joinGroup(id);
  if (button.dataset.action === "leave") leaveGroup(id);
 
  const sameButton = groupList.querySelector(`button[data-id="${id}"]`);
  if (sameButton) sameButton.focus();
});
 
createForm.addEventListener("submit", handleCreateSubmit);
 
fillCourseOptions();
renderGroups();
 