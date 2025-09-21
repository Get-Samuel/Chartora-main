import React from "react";
import ChartoraLogo from '/Chartora-AI-Icon.svg';

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className="flex flex-row">
      <div
  className={`w-fit ${
    isUser
      ? "bg-accent p-2 px-5 max-w-[60%] text-hue rounded-full ml-auto"
      : "text-hue p-2 border-stroke mr-auto"
  }`}
>
  {!isUser && (
    <img
      src={ChartoraLogo}
      alt="Chartora profile"
      className="inline-block w-6 h-6 mr-2 align-middle"
    />
  )}
  <span>{text}</span>
</div>

    </div>
  );
};

export default MessageBubble;
