import postcss from "postcss";

function getIconClassesFromCSS(rawCSS: string) {
  return postcss()
    .process(rawCSS, { from: "." })
    .then((result) => {
      const x = result.root.nodes
        .filter(
          (el) =>
            el.type === "rule" &&
            el.selector.indexOf(".icon-") > 0 &&
            el.selector.match(/:global(.*):before/)
        )
        .map((el) => ({
          //@ts-ignore
          className: el.selector
            .match(/:global(.*):before/)[1]
            .replace(/[:.]/g, "")
            .trim(),
          //@ts-ignore
          ...el.nodes
            //@ts-ignore
            .map((_el) => ({ [_el.prop]: _el.value }))
            //@ts-ignore
            .reduce((obj, el) => {
              Object.entries(el).map(([key, value]) => {
                obj[key] = value;
              });
              return obj;
            }, {}),
        }));
      return x.reduce((obj, el) => {
        obj[el.content.toLowerCase().replace(/'|\\/g, "")] = el;
        return obj;
      }, {});
    })
    .catch((err) => {
      console.log(err);
    });
}

export default getIconClassesFromCSS;
