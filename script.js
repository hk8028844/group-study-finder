// ---------- Data ----------

const currentUser = "You";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MODES = ["On campus", "Online"];
const DURATIONS = [
  { minutes: 30, label: "30 minutes" },
  { minutes: 60, label: "1 hour" },
  { minutes: 90, label: "1 hour 30 minutes" },
  { minutes: 120, label: "2 hours" },
  { minutes: 180, label: "3 hours" }
];
const MIN_CAPACITY = 2;
const MAX_CAPACITY = 12;

const groups = [
  { id: 1, course: "CS 344", title: "Web Engineering revision", day: "Tuesday", time: "16:00", duration: 90,
    mode: "On campus", location: "SEECS library, table 3", capacity: 5, members: ["Ayesha", "Bilal"] },
  { id: 2, course: "SE 315", title: "Cloud project planning", day: "Tuesday", time: "17:00", duration: 60,
    mode: "On campus", location: "SEECS cafeteria", capacity: 4, members: ["Sara", "Usman", "Zain"] },
  { id: 3, course: "CS 330", title: "OS midterm prep", day: "Wednesday", time: "14:00", duration: 120,
    mode: "On campus", location: "Room 105", capacity: 3, members: ["Omar", "Hira", "Dawood"] },
  { id: 4, course: "CS 344", title: "JavaScript practice night", day: "Thursday", time: "20:00", duration: 60,
    mode: "Online", location: "Google Meet (link in group chat)", capacity: 6, members: ["Hassan"] },
  { id: 5, course: "MT 331", title: "Probability problem solving", day: "Friday", time: "11:00", duration: 90,
    mode: "Online", location: "Zoom (link in group chat)", capacity: 8, members: ["Maryam", "Ali"] },
  { id: 6, course: "SE 315", title: "Exam revision circle", day: "Tuesday", time: "17:30", duration: 60,
    mode: "On campus", location: "NUST central library", capacity: 5, members: ["Fatima"] }
];

let filters = { search: "", course: "", day: "", mode: "" };
let nextId = Math.max(...groups.map((group) => group.id)) + 1;
let justAddedId = null;

// ---------- Rules (no DOM): seats never go below zero, nobody joins twice, joined groups never overlap ----------

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(totalMinutes) {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function endMinutes(group) {
  return toMinutes(group.time) + group.duration;
}

function timeRange(group) {
  return `${group.time}\u2013${toTime(endMinutes(group))}`;
}

function seatsLeft(group) {
  return group.capacity - group.members.length;
}

function isMember(group) {
  return group.members.includes(currentUser);
}

function overlaps(a, b) {
  return a.day === b.day && toMinutes(a.time) < endMinutes(b) && toMinutes(b.time) < endMinutes(a);
}

function findClash(candidate) {
  return groups.find((group) => group.id !== candidate.id && isMember(group) && overlaps(group, candidate));
}

function getJoinStatus(group) {
  if (isMember(group)) return { state: "joined", note: "You are in this group." };
  if (seatsLeft(group) === 0) return { state: "full", note: "This group is full." };

  const clash = findClash(group);
  if (clash) {
    return { state: "clash", note: `Overlaps with your group "${clash.title}" (${clash.day}, ${timeRange(clash)}).` };
  }
  return { state: "open", note: "" };
}

function matchesFilters(group) {
  const text = filters.search.trim().toLowerCase();
  const matchesText =
    text === "" ||
    group.title.toLowerCase().includes(text) ||
    group.course.toLowerCase().includes(text);

  return (
    matchesText &&
    (filters.course === "" || group.course === filters.course) &&
    (filters.day === "" || group.day === filters.day) &&
    (filters.mode === "" || group.mode === filters.mode)
  );
}

function hasActiveFilters() {
  return filters.search.trim() !== "" || filters.course !== "" || filters.day !== "" || filters.mode !== "";
}

function bySchedule(a, b) {
  return DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || toMinutes(a.time) - toMinutes(b.time);
}

function problem(field, message) {
  return { field, message };
}

function validateNewGroup(data) {
  if (data.course === "") return problem("course", "Enter the course, for example CS 344.");
  if (data.title.length < 5 || data.title.length > 60) {
    return problem("title", "The title must be 5 to 60 characters long. Extra spaces do not count.");
  }
  if (!DAYS.includes(data.day)) return problem("day", "Choose a meeting day.");
  if (!/^\d{2}:\d{2}$/.test(data.time)) return problem("time", "Choose a start time.");
  if (!DURATIONS.some((option) => option.minutes === data.duration)) {
    return problem("duration", "Choose how long the session lasts.");
  }
  if (toMinutes(data.time) + data.duration > 24 * 60) {
    return problem("duration", "This session would run past midnight. Choose an earlier start or a shorter session.");
  }
  if (!MODES.includes(data.mode)) return problem("mode", "Choose on campus or online.");
  if (data.location === "") return problem("location", "Enter where the group will meet.");
  if (!Number.isInteger(data.capacity) || data.capacity < MIN_CAPACITY || data.capacity > MAX_CAPACITY) {
    return problem("capacity", `Capacity must be a whole number from ${MIN_CAPACITY} to ${MAX_CAPACITY}.`);
  }

  const duplicate = groups.some(
    (group) =>
      group.course === data.course &&
      group.day === data.day &&
      group.time === data.time &&
      group.location.toLowerCase() === data.location.toLowerCase()
  );
  if (duplicate) {
    return problem("location", "A group with the same course, day, start time and location already exists.");
  }

  const clash = findClash(data);
  if (clash) {
    return problem("time", `This overlaps with your group "${clash.title}" (${clash.day}, ${timeRange(clash)}).`);
  }
  return null;
}

// ---------- Page elements ----------

const filterForm = document.getElementById("filter-form");
const searchInput = document.getElementById("search");
const courseFilter = document.getElementById("filter-course");
const dayFilter = document.getElementById("filter-day");
const modeFilter = document.getElementById("filter-mode");
const clearButton = document.getElementById("clear-filters");

const summaryBox = document.getElementById("summary");
const messageBox = document.getElementById("message");
const groupList = document.getElementById("group-list");

const createPanel = document.getElementById("create-panel");
const createForm = document.getElementById("create-form");
const createMessage = document.getElementById("create-message");
const newDay = document.getElementById("new-day");
const newDuration = document.getElementById("new-duration");

// ---------- Rendering ----------

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = text ? `message ${type}` : "message";
}

function createSeats(group) {
  const left = seatsLeft(group);
  const seats = el("div", "seats");

  const dots = el("span", "dots");
  dots.setAttribute("aria-hidden", "true");
  for (let i = 0; i < group.capacity; i++) {
    dots.append(el("span", i < group.members.length ? "dot taken" : "dot"));
  }

  const label = left === 0 ? "No seats left" : `${left} of ${group.capacity} seats left`;
  seats.append(dots, el("span", "seat-text", label));
  return seats;
}

function createButton(group, status) {
  const button = el("button", "button");
  button.type = "button";
  button.dataset.id = group.id;

  if (status.state === "joined") {
    button.dataset.action = "leave";
    button.classList.add("secondary");
    button.textContent = "Leave";
  } else {
    button.dataset.action = "join";
    button.textContent = status.state === "full" ? "Full" : "Join";
    button.disabled = status.state !== "open";
  }

  button.setAttribute("aria-label", `${button.textContent}: ${group.title}`);
  return button;
}

function createCard(group) {
  const status = getJoinStatus(group);
  const card = el("article", `group-card is-${status.state}`);
  card.dataset.groupId = group.id;
  if (group.id === justAddedId) card.classList.add("is-new");

  const top = el("div", "card-top");
  top.append(el("span", "course", group.course), el("span", "mode", group.mode));

  const title = el("h3", "title", group.title);
  title.tabIndex = -1;

  card.append(
    top,
    title,
    el("p", "when", `${group.day}, ${timeRange(group)}`),
    el("p", "where", group.location),
    createSeats(group)
  );

  if (status.note) {
    const note = el("p", "note", status.note);
    note.id = `note-${group.id}`;
    card.append(note);
  }

  const button = createButton(group, status);
  if (status.state === "clash") button.setAttribute("aria-describedby", `note-${group.id}`);
  card.append(button);
  return card;
}

function createEmptyState() {
  const box = el("div", "empty");
  box.append(
    el("p", "empty-title", "No groups match your search."),
    el("p", "", "Try different filters, or start the group yourself.")
  );

  const actions = el("div", "empty-actions");
  if (hasActiveFilters()) {
    const clear = el("button", "button secondary", "Clear filters");
    clear.type = "button";
    clear.dataset.action = "clear";
    actions.append(clear);
  }
  const create = el("button", "button", "Create a group");
  create.type = "button";
  create.dataset.action = "create";
  actions.append(create);

  box.append(actions);
  return box;
}

function updateSummary(list) {
  const openSeats = list.reduce((total, group) => total + seatsLeft(group), 0);
  const joined = groups.filter(isMember).length;

  let text = `${list.length} ${list.length === 1 ? "group" : "groups"} found, ${openSeats} ${openSeats === 1 ? "seat" : "seats"} open.`;
  if (joined > 0) text += ` You have joined ${joined}.`;
  summaryBox.textContent = text;
}

function renderGroups() {
  const list = groups.filter(matchesFilters).sort(bySchedule);
  groupList.replaceChildren();

  if (list.length === 0) {
    groupList.append(createEmptyState());
  } else {
    list.forEach((group) => groupList.append(createCard(group)));
  }

  updateSummary(list);
  clearButton.hidden = !hasActiveFilters();
}

function addOptions(select, options) {
  options.forEach(({ value, label, selected }) => {
    const option = el("option", "", label);
    option.value = value;
    if (selected) option.defaultSelected = true;
    select.append(option);
  });
}

function fillCourseOptions() {
  const selected = courseFilter.value;
  const courses = [...new Set(groups.map((group) => group.course))].sort();

  courseFilter.replaceChildren(el("option", "", "All courses"));
  courseFilter.firstChild.value = "";
  addOptions(courseFilter, courses.map((course) => ({ value: course, label: course })));
  courseFilter.value = selected;
}

// ---------- Filters ----------

function readFilters() {
  filters = {
    search: searchInput.value,
    course: courseFilter.value,
    day: dayFilter.value,
    mode: modeFilter.value
  };
}

function updateFilters() {
  readFilters();
  justAddedId = null;
  showMessage("");
  renderGroups();
}

function clearFilters() {
  filterForm.reset();
  updateFilters();
  searchInput.focus();
}

// ---------- Joining and leaving ----------

function findGroup(id) {
  return groups.find((group) => group.id === id);
}

function joinGroup(id) {
  const group = findGroup(id);
  if (!group) return;

  const status = getJoinStatus(group);
  if (status.state !== "open") {
    showMessage(`${group.title}: ${status.note}`, "warning");
    return;
  }

  group.members.push(currentUser);
  justAddedId = null;
  renderGroups();
  showMessage(`You joined "${group.title}".`, "success");
}

function leaveGroup(id) {
  const group = findGroup(id);
  if (!group || !isMember(group)) return;

  group.members = group.members.filter((name) => name !== currentUser);
  justAddedId = null;
  renderGroups();
  showMessage(`You left "${group.title}".`, "success");
}

// ---------- Creating a group ----------

function clean(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

function readCreateForm() {
  const form = new FormData(createForm);
  return {
    course: clean(form.get("course")).toUpperCase(),
    title: clean(form.get("title")),
    day: clean(form.get("day")),
    time: clean(form.get("time")),
    duration: Number(form.get("duration")),
    mode: clean(form.get("mode")),
    location: clean(form.get("location")),
    capacity: Number(form.get("capacity"))
  };
}

function hideCreateError() {
  createMessage.hidden = true;
  createMessage.textContent = "";
}

function openCreatePanel() {
  createPanel.open = true;
  createForm.elements.course.focus();
}

function handleCreateSubmit(event) {
  event.preventDefault();

  const data = readCreateForm();
  const issue = validateNewGroup(data);
  if (issue) {
    createMessage.textContent = issue.message;
    createMessage.hidden = false;
    const field = createForm.querySelector(`[name="${issue.field}"]`);
    if (field) field.focus();
    return;
  }

  const group = { id: nextId, ...data, members: [currentUser] };
  nextId++;
  groups.push(group);

  createForm.reset();
  hideCreateError();
  createPanel.open = false;

  fillCourseOptions();
  filterForm.reset();
  readFilters();
  justAddedId = group.id;
  renderGroups();
  showMessage(`Created "${group.title}". You are its first member.`, "success");

  groupList.querySelector(`[data-group-id="${group.id}"] h3`).focus();
}

// ---------- Events ----------

searchInput.addEventListener("input", updateFilters);
[courseFilter, dayFilter, modeFilter].forEach((select) => select.addEventListener("change", updateFilters));
filterForm.addEventListener("submit", (event) => event.preventDefault());
clearButton.addEventListener("click", clearFilters);

groupList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "join") joinGroup(id);
  if (action === "leave") leaveGroup(id);
  if (action === "clear") clearFilters();
  if (action === "create") openCreatePanel();

  if (action === "join" || action === "leave") {
    const sameButton = groupList.querySelector(`button[data-id="${id}"]`);
    if (sameButton) sameButton.focus();
  }
});

createForm.addEventListener("submit", handleCreateSubmit);
createForm.addEventListener("input", hideCreateError);

// ---------- Start ----------

addOptions(dayFilter, DAYS.map((day) => ({ value: day, label: day })));
addOptions(modeFilter, MODES.map((mode) => ({ value: mode, label: mode })));
addOptions(newDay, DAYS.map((day) => ({ value: day, label: day })));
addOptions(newDuration, DURATIONS.map((option) => ({ value: option.minutes, label: option.label, selected: option.minutes === 60 })));
fillCourseOptions();
renderGroups();