import React from "react";

function ChatMessage({ message }) {
  const contentWithLinks = message.replace(
    /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi,
    (match) => {
      return `<a href="${match}" target="_blank">${
        match.length > 20 ? match.slice(0, 30) + "..." : match
      }</a>`;
    }
  );

  return (
    <p
      className="m-0 p-0"
      dangerouslySetInnerHTML={{ __html: contentWithLinks }}
    ></p>
  );
}

export default ChatMessage;
