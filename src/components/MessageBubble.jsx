import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`w-fit ${
        isUser
          ? "bg-accent p-2 px-5 max-w-[60%] text-hue rounded-full ml-auto"
          : "text-hue p-2 border-l-6 border-stroke mr-auto"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
