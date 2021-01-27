import React from "react";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslaString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { HsvaColor, Orientation } from "../../types";
import getInteractionValueFromOrientation from "../../utils/orientation";

interface Props {
  className?: string;
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
  orientation?: Orientation;
}

export const Alpha = ({ className, hsva, onChange, orientation = "horizontal" }: Props): JSX.Element => {
  const handleMove = (interaction: Interaction) => {
    onChange({ a: getInteractionValueFromOrientation(interaction, orientation) });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    onChange({ a: clamp(hsva.a + offset.left) });
  };

  // We use `Object.assign` instead of the spread operator
  // to prevent adding the polyfill (about 150 bytes gzipped)
  const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
  const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
  const gradientOrientation = (orientation === "vertical") ? '180deg' : '90deg';

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientOrientation}, ${colorFrom}, ${colorTo})`,
  };

  const nodeClassName = formatClassName(["react-colorful__alpha", className]);

  return (
    <div className={nodeClassName}>
      <div className="react-colorful__alpha-gradient" style={gradientStyle} />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${round(hsva.a * 100)}%`}
      >
        {orientation === "vertical" ?
          <Pointer
            className="react-colorful__alpha-pointer"
            top={hsva.a}
            color={hsvaToHslaString(hsva)}
          />
          :
          <Pointer
            className="react-colorful__alpha-pointer"
            left={hsva.a}
            color={hsvaToHslaString(hsva)}
          />
        }
      </Interactive>
    </div>
  );
};
