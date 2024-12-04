import { parseISO, format, differenceInCalendarDays } from "date-fns";

// used for generating html for a labe - value pair
class Printout {
  #label;
  constructor(label) {
    this.#label = label + ":";
  }

  print(value) {
    const labelNode = document.createElement("p");
    labelNode.textContent = this.#label;
    const valueNode = document.createElement("p");
    valueNode.textContent = value;
    return {
      label: labelNode,
      value: valueNode,
    };
  }
}

// implements the Printout interface but adds date formatting and
// a class to the value indicating if its in past or today
class DatePrintout {
  #printout;
  constructor(label) {
    this.#printout = new Printout(label);
  }

  print(value) {
    const printed = this.#printout.print(value);
    if (value === "") {
      return printed;
    }

    /*
            parseISO() assumes date is provided in current time zone
            instead of UTC 0 like others (e.g. parse()).
            Necessary because format()/now() default to local time zone.
            */
    const dueDate = parseISO(value);
    printed.value.textContent = format(dueDate, "MM/dd/yyyy");
    const diff = differenceInCalendarDays(dueDate, Date.now());
    if (diff === 0) {
      printed.value.classList.add("today");
    } else if (diff < 0) {
      printed.value.classList.add("past");
    }

    return printed;
  }
}

class Printer {
  #printouts;

  constructor() {
    this.#printouts = new Map();
  }

  addPrintout(key, printout, valueClassList = []) {
    this.#printouts.set(key, { printout, classList: valueClassList });
  }

  print(onto, obj) {
    for (const key of this.#printouts.keys()) {
      if (!Object.hasOwn(obj, key)) {
        continue;
      }
      const format = this.#printouts.get(key);
      const printout = format.printout;
      const classList = format.classList;
      const printed = printout.print(obj[key]);
      if (classList.length !== 0) {
        printed.value.classList.add(classList);
      }
      onto.appendChild(printed.label);
      onto.appendChild(printed.value);
    }
  }

  // allows reusing custom printouts
  // currently used to extract formatted/styled date
  printSingleValue(onto, obj, key) {
    const printout = this.#printouts.get(key).printout;
    onto.appendChild(printout.print(obj[key]).value);
  }
}

export { Printer, Printout, DatePrintout };
