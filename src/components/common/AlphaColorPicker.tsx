import React from "react";

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor, Orientation } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { formatClassName } from "../../utils/format";

import "../../css/styles.css";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
  orientation?: Orientation;
}

export const AlphaColorPicker = <T extends AnyColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  onChange,
  orientation = "horizontal"
}: Props<T>): JSX.Element => {
  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);

  const nodeClassName = formatClassName(["react-colorful", className]);

  return (
    <div className={nodeClassName}>
      <Saturation hsva={hsva} onChange={updateHsva} />
      <Hue hue={hsva.h} onChange={updateHsva} orientation={orientation} />
      <Alpha hsva={hsva} onChange={updateHsva} className="react-colorful__last-control" orientation={orientation} />
    </div>
  );
};
