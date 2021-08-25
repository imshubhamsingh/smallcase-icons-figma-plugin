import { showUI } from "@create-figma-plugin/utilities";
import { on } from "@create-figma-plugin/utilities";
import { setRelaunchButton } from "@create-figma-plugin/utilities";

export default function () {
  setRelaunchButton(figma.currentPage, "smallcaseIcons", {
    description: "A set of icons designed by the smallcase design team.",
  });
  const options = { width: 300, height: 400 };
  showUI(options);

  let iconPlacementPosition = 0; // this is what keeps newly added icons from overlapping with each other

  on("IMPORT", ({ svg, name }) => {
    const iconNode = figma.createNodeFromSvg(svg);
    iconNode.name = `icon-${name}`;
    iconNode.x = iconPlacementPosition;
    figma.currentPage.appendChild(iconNode);
    iconPlacementPosition = iconPlacementPosition + iconNode.width + 10;
    figma.viewport.scrollAndZoomIntoView([iconNode]);
  });
}
