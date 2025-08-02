import React from "react";

interface ImageWidgetProps {
  config: {
    src: string;
    alt: string;
    fit: "cover" | "contain" | "fill" | "none";
  };
}

const ImageWidget: React.FC<ImageWidgetProps> = ({ config }) => {
  const { src, alt, fit } = config;

  const getObjectFit = () => {
    switch (fit) {
      case "cover":
        return "cover";
      case "contain":
        return "contain";
      case "fill":
        return "fill";
      case "none":
        return "none";
      default:
        return "cover";
    }
  };

  return (
    <div
      className="image-widget"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: getObjectFit(),
          borderRadius: "8px",
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "https://via.placeholder.com/300x200?text=Image+Not+Found";
        }}
      />
    </div>
  );
};

export default ImageWidget;
