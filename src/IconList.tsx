import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import extractIcons, { IIconInfo } from "./utils/glyph-extractor";
import { emit } from "@create-figma-plugin/utilities";

import styles from "./style.css";

function IconList() {
  let [svg, setSvg] = useState<Array<IIconInfo>>([]);

  const importToFigma = ({ name, svg }: IIconInfo) => {
    console.log(svg)
    emit("IMPORT", { name, svg });
  };

  useEffect(() => {
    extractIcons({
      height: 15,
      width: 15,
    }).then((x) => {
      setSvg(x);
    });
  }, []);

  return (
    <div className={styles.iconList}>
      {svg.map((el) => {
        return (
          <button
            dangerouslySetInnerHTML={{ __html: el.svg }}
            className={styles.icon}
            onClick={() => importToFigma(el)}
          />
        );
      })}
    </div>
  );
}

export default IconList;
