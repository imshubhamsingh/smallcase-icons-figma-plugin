//@ts-ignore
import iconSvg from "@smallcase/shringar/icons/icomoon.svg";
import { decode } from "js-base64";

interface IExtractIcons {
  height: number;
  width: number;
}

export interface IIconInfo {
  code: string;
  name: string;
  svg: string;
}

function extractIcons({ height, width }: IExtractIcons): IIconInfo[] {
  const base64 = iconSvg.replace("data:image/svg+xml;base64", "");
  const svg = decode(base64);
  const doc = new DOMParser().parseFromString(svg, "text/xml");

  const fontSpec = doc.getElementsByTagName("font")[0];
  const defaultCharWidth = fontSpec.getAttribute("horiz-adv-x");
  const fontFace = doc.getElementsByTagName("font-face")[0];
  const defaultCharHeight = fontFace.getAttribute("units-per-em");
  const defaultCharAscent = fontFace.getAttribute("ascent");
  const glyphs = doc.getElementsByTagName("glyph");

  const translateOffset = defaultCharAscent;

  let dataOnGlyphs: IIconInfo[] = [];

  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];
    //some strange fonts put empty glyphs in them
    if (!glyph) continue;
    let iconCode = glyph.getAttribute("unicode");
    const pathData = glyph.getAttribute("d");
    const customWidthMatch = glyph.getAttribute("horiz-adv-x");
    const contentWidth = customWidthMatch ? customWidthMatch : defaultCharWidth;

    //some glyphs matched without a unicode value so we should ignore them
    if (!iconCode) continue;

    // handle encoded values
    if (iconCode.indexOf("&#") !== -1) {
      iconCode = iconCode.replace("&#x", "");
    }

    //Skip empty-looking glyphs
    if (!iconCode.length || !pathData || pathData.length < 10) continue;

    const useCharacterName = glyph.getAttribute("glyph-name");
    const charInfo = {
      code: iconCode,
      name: useCharacterName,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${contentWidth} ${defaultCharHeight}" height="${height}" width="${width}">
        <g transform="scale(1,-1) translate(0 -${translateOffset})" fill="black">
            <path d="${pathData}"/>
        </g></svg>`,
    };
    //@ts-ignore
    dataOnGlyphs = dataOnGlyphs.concat(charInfo);
  }
  return dataOnGlyphs;
}

export default extractIcons;
