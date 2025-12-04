// insults when adding tasks
let addTaskInsult = [
  "Another one? You must love suffering.",
  "Wow, piling it on, aren’t you?",
  "Your to‑do list just sighed.",
  "Keep feeding the beast…",
  "Oh sure, add more chaos!"
];

// insults when deleting tasks
let deleteTaskInsult = [
  "Running away, huh?",
  "Delete it and pretend it never existed.",
  "Coward’s move, but okay.",
  "Poof! Gone like your motivation.",
  "Classic avoidance strategy."
];

// insults when a task is complete
let completeTaskInsult = [
  "Finally! Took you long enough.",
  "Well, miracles do happen.",
  "Mark it done before it resurrects.",
  "Congrats, you beat procrastination… this time.",
  "One less excuse in your life."
];

// insults when hovering over completed task counter
let completeInsult = [
  "Look at you, overachiever.",
  "Flexing those checkmarks, huh?",
  "Don’t get cocky.",
  "Wow, productivity royalty!",
  "Enjoy it before the list grows again."
];

// insults when hovering over failed tasks counter
let failedInsult = [
  "Ah yes, the graveyard of ambition.",
  "Failure looks good on you.",
  "So many dreams, so little effort.",
  "Your tasks are crying in the bin.",
  "A monument to procrastination."
];

function getInsult(type) {
    let source
switch (type) {
    case 'add':
        source = addTaskInsult;
        break;
    
    case 'deleted': 
        source = deleteTaskInsult;
        break;

    case 'complete':
        source = completeTaskInsult;
        break;

    case 'completeList': 
        source = completeInsult;
        break;

    case 'failedList': 
        source = failedInsult;
        break;

    default: 
    source = ('No insult found')

}
 return source[Math.floor(Math.random() * source.length)];

}


export {
    getInsult
}