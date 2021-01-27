import { Interaction } from "../components/common/Interactive";
import { Orientation } from "../types";

export default function getInteractionValueFromOrientation(interaction: Interaction, orientation: Orientation): number {
	if (orientation === "vertical") {
		return interaction.top;
	} else {
		return interaction.left;
	}
}