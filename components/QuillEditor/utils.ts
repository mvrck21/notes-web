import React from "react";

// function getSelectionText() {
//   var text = "";
//   if (window.getSelection) {
//     text = window.getSelection().toString();
//   } else if (document.selection && document.selection.type != "Control") {
//     text = document.selection.createRange().text;
//   }
//   return text;
// }

// function wh(e) {
//   var thisText = $(this).text();
//   var selectedText = getSelectionText();
//   var start = thisText.indexOf(selectedText);
//   var end = start + selectedText.length;
//   if (start >= 0 && end >= 0) {
//     console.log("start: " + start);
//     console.log("end: " + end);
//   }
// }

// function setLink() {
//     const range = quill.getSelection();

// }

function handleNodeHover(event: React.MouseEvent<HTMLSpanElement>) {
  console.log("alert! alert!");
}

function handleNodeClick(event: React.MouseEvent<HTMLSpanElement>) {
  event?.preventDefault();
  alert("don't clicm me!");
}

export function adjustLinkNode(node: any) {
  //   node.setAttribute("href", "/");

  //   node.setAttribute("id", "nnnode");

  //   node.addEventListener("mouseover", handleNodeHover);

  node.addEventListener("click", handleNodeClick);

  return node;
}

// const [data, setData] = useState(null);
// const [isLoading, setLoading] = useState(true);

// useEffect(() => {
//   fetch("/api/profile-data")
//     .then((res) => res.json())
//     .then((data) => {
//       setData(data);
//       setLoading(false);
//     });
// }, []);
