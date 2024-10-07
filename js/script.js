const typedTextElement = document.getElementById("typed-text");
const cursorElement = document.getElementById("cursor");

let currentIndex = 0;
let typingInProgress = false;
let isErasing = false;
let roundIndex = 0; // Flag for tracking the rounds of typing

const textSets = [
  "I'm a Lab Engineer.",
  "UX/UI Designer.",
  "Product Designer.",
  "Web Designer."
];

function typeNextLetter() {
  if (!isErasing) {
    const currentTextSet = textSets[roundIndex];
    if (currentIndex < currentTextSet.length) {
      typedTextElement.textContent += currentTextSet[currentIndex];
      currentIndex++;
      setTimeout(typeNextLetter, 50); // Adjust typing speed here (in milliseconds)
    } else {
      if (roundIndex === textSets.length - 1) {
        // Stop typing and erasing processes after the last round
        typingInProgress = false;
        isErasing = false;
        return;
      }

      isErasing = true;
      setTimeout(typeNextLetter, 500); // Delay before starting erasing
    }
  } else {
    if (typedTextElement.textContent.endsWith("a ")) {
      isErasing = false;
      setTimeout(() => {
        roundIndex = (roundIndex + 1) % textSets.length; // Move to the next text set
        currentIndex = 0;
        typeNextLetter(); // Start typing the next set immediately
      }, 500); // Delay before transitioning to the next text set
    }
    if (isErasing && currentIndex > 0) {
      typedTextElement.textContent = typedTextElement.textContent.slice(0, -1);
      currentIndex--;
      setTimeout(typeNextLetter, 50); // Adjust erasing speed here (in milliseconds)
    } else {
      typingInProgress = false;
      isErasing = false;
    }
  }
}


function resetTypingAnimation() {
  typedTextElement.textContent = "";
  currentIndex = 0;
  typingInProgress = true;
  isErasing = false;
  roundIndex = 0;
  typeNextLetter();

  
}

function handleScroll() {
  if (!typingInProgress && window.scrollY <= 0) {
    resetTypingAnimation();
  }
}

window.addEventListener("scroll", handleScroll);
resetTypingAnimation();