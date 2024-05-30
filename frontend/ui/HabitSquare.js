export class HabitSquare extends EventTarget {
  constructor(id, title, done) {
    super();
    this.id = id;
    this.title = title;
    this.done = done;
    this.element = document.createElement("button");
    this.element = createElement(this.element, title, done);
    this.element.addEventListener("click", () => {
      const event = new CustomEvent("toggle");
      this.dispatchEvent(event);
    });
  }
}

const createElement = (element, title, done) => {
  element.classList.add("habit-square");
  if (done) {
    element.classList.add("habit-done");
  }
  const titleElement = createTitleElement(title);
  const doneElement = createDoneElement(done);

  element.appendChild(titleElement);
  element.appendChild(doneElement);
  return element;
};

const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;
  return titleElement;
};

const createDoneElement = (done) => {
  const doneElement = document.createElement("span");
  doneElement.innerText = done ? "✅" : "❌";
  return doneElement;
};
