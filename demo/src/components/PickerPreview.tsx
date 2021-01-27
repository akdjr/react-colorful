import React, { useState } from "react";
import { ColorPickerBaseProps, AnyColor } from "../../../src/types";

interface Props<T extends AnyColor> {
  title: string;
  PickerComponent: React.ComponentType<Partial<ColorPickerBaseProps<T>>>;
  initialColor: T;
  className?: string;
}

export function PickerPreview<T extends AnyColor>({
  className = "preview__demo",
  title,
  PickerComponent,
  initialColor,
}: Props<T>): JSX.Element {
  const [color, setColor] = useState<T>(initialColor);

  const handleChange = (color: T) => {
    console.log("🎨", color);
    setColor(color);
  };

  return (
    <div className="preview">
      <div className="preview__title">{title}</div>
      <PickerComponent className={className} color={color} onChange={handleChange} />
      <div className="preview__output">{JSON.stringify(color)}</div>
    </div>
  );
}
