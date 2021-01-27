import React from "react";
import { useColorManipulation } from "../hooks/useColorManipulation";

import { AnyColor, ColorModel, ColorPickerBaseProps, RgbaColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { rgbaToHsva, hsvaToRgba } from "../utils/convert";
import { formatClassName } from "../utils/format";
import { Alpha } from "./common/Alpha";
import { Hue } from "./common/Hue";
import { Saturation } from "./common/Saturation";

const colorModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsva,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects,
};

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const AlphaColorPickerVertical = <T extends AnyColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  onChange,
}: Props<T>): JSX.Element => {
  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);

  const nodeClassName = formatClassName(["react-colorful", className]);

  return (
    <div className={nodeClassName}>
      <Saturation hsva={hsva} onChange={updateHsva} />
      <Hue hue={hsva.h} onChange={updateHsva} orientation="vertical" />
      <Alpha hsva={hsva} onChange={updateHsva} className="react-colorful__last-control" orientation="vertical" />
    </div>
  );
};

export const RgbaColorPickerVertical = (props: Partial<ColorPickerBaseProps<RgbaColor>>): JSX.Element => (
  <AlphaColorPickerVertical {...props} colorModel={colorModel} />
);
