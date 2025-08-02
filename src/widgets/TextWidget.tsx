import React from "react";

interface TextWidgetProps {
  config: {
    content: string;
    fontSize: number;
    fontWeight: string;
    textAlign: string;
  };
}

const TextWidget: React.FC<TextWidgetProps> = ({ config }) => {
  const { content, fontSize, fontWeight, textAlign } = config;

  return (
    <div
      className="text-widget"
      style={{
        fontSize: `${fontSize}px`,
        fontWeight,
        textAlign: textAlign as "left" | "center" | "right",
        padding: "16px",
        height: "100%",
        overflow: "auto",
        wordBreak: "break-word",
      }}
    >
      {content}
    </div>
  );
};

export default TextWidget;
