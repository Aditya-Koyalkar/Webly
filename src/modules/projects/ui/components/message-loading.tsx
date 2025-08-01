import Image from "next/image";
import { useEffect, useState } from "react";

export const ShimmerMessages = () => {
  const messages = [
    "Thinking...",
    "Loading...",
    "Generating...",
    "Building your website...",
    "Crafting components",
    "Optimizing layout...",
    "Adding final touches...",
    "Almost ready...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">{messages[currentMessageIndex]}</span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image src={"/logo.svg"} alt="Webly" width={18} height={18} className="text-sm font-medium" />
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
