import { useEffect, useRef } from "react";

import "./styles.css";

type Props = {
  anchorSelector: string;
};

export function ToolTip(props: Props) {
  const { anchorSelector } = props;

  const tooltip = useRef<HTMLDivElement | null>(null);

  function hideTooltip() {
    if (tooltip.current) {
      tooltip.current.style.display = "none";
    }
  }

  // Hide tooltip when clicking anywhere else
  document.addEventListener("click", (event) => {
    if (
      //   !tooltip.current ||
      !tooltip.current?.contains(event.target as HTMLElement)
      //  && !(event.target as HTMLElement).id.includes("clickable o web-node")
    ) {
      hideTooltip();
    }
  });

  useEffect(() => {
    const clickedElement = document.querySelector(anchorSelector);

    console.log(`clicked element`, clickedElement);

    // if (clickedElement) {
    //     tooltipRef.current =
    // }
  }, [anchorSelector]);

  return (
    <div id="tooltip" className="tooltip" ref={tooltip}>
      I am a Tooltip with a very long text!
      <span className="tooltip-arrow"></span>
    </div>
  );
}

const tooltip = document.getElementById("tooltip");
const clickableElements = document.querySelectorAll(".clickable");

// Function to position and show the tooltip
function showTooltip(event, element) {
  // Get position and dimensions of the clicked element
  const rect = element.getBoundingClientRect();

  // Calculate tooltip position
  const tooltipX = rect.left + window.scrollX + rect.width / 2; // Center horizontally
  const tooltipY = rect.top + window.scrollY - 10; // Above the element with 10px spacing

  // Position the tooltip
  tooltip.style.left = `${tooltipX}px`;

  tooltip.style.top = `${tooltipY}px`;

  // Show the tooltip
  tooltip.style.display = "block";
}

// Function to hide the tooltip

// Add event listeners to clickable elements
clickableElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent this click from propagating to the document
    showTooltip(event, element);
  });
});
