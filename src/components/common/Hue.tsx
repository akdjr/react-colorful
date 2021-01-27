import React from "react";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { Orientation } from "../../types";
import getInteractionValueFromOrientation from "../../utils/orientation";

interface Props {
  className?: string;
  hue: number;
  onChange: (newHue: { h: number }) => void;
  orientation?: Orientation;
}

const HueBase = ({ className, hue, onChange, orientation = "horizontal" }: Props) => {
  const handleMove = (interaction: Interaction) => {
    onChange({ h: 360 * getInteractionValueFromOrientation(interaction, orientation) });
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    onChange({
      h: clamp(hue + offset.left * 360, 0, 360),
    });
  };

  const nodeClassName = formatClassName(["react-colorful__hue", className]);

  return (
    <div className={nodeClassName}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuetext={round(hue)}
      >
        {orientation === "vertical" ?
          <Pointer
            className="react-colorful__hue-pointer"
            top={hue / 360}
            color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
          />
          :
          <Pointer
            className="react-colorful__hue-pointer"
            left={hue / 360}
            color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
          />
        }

      </Interactive>
    </div>
  );
};

export const Hue = React.memo(HueBase);
