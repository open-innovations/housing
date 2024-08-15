import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
// import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import redirects from "lume/plugins/redirects.ts";
import nav from "lume/plugins/nav.ts";
import date from "lume/plugins/date.ts";
// Loaders
import json from "lume/core/loaders/json.ts";
import { duckDbLoader, resultTable } from "jsr:@dringtech/lume-duck@0.2.0";


// Importing the OI Lume charts and utilities
import oiViz from "https://deno.land/x/oi_lume_viz@v0.15.10/mod.ts";
import autoDependency from "https://deno.land/x/oi_lume_utils@v0.4.0/processors/auto-dependency.ts";
import csvLoader from "https://deno.land/x/oi_lume_utils@v0.4.0/loaders/csv-loader.ts";


const site = lume({
    src: './src',
    // TODO Update this with the proper URL
    location: new URL("https://open-innovations.github.io/housing/"),
  });
site.process([".html"], (pages) => pages.forEach(autoDependency));

site.use(base_path());
// site.use(date());
site.use(metas({
    defaultPageData: {
      title: 'title', // Use the `date` value as fallback.
    },
  }));
site.use(postcss());
site.use(redirects());
site.use(nav());
site.use(date());

site.loadData([".hexjson"], json);
site.copy('.nojekyll');
site.copy('assets/js');
site.loadData([".csv", ".tsv", ".dat"], csvLoader({ basic: true }));
site.loadData([".sql"], duckDbLoader());


// Import lume viz
import oiVizConfig from "./oi-viz-config.ts";
site.use(oiViz(oiVizConfig));

site.filter("capitalise", (body) => {
  if (body.length === 0) {
      return body;
  }
  return body.charAt(0).toUpperCase() + body.slice(1);
})

site.filter("ySpacing", (entries, key) => {
  let maxVal = -Infinity
  for (const obj of entries) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (maxVal === null || value > maxVal) {
        maxVal = value;
      }
    } else {
      maxVal = 0
    }
  }
  const magnitude = Math.floor(Math.log10(Math.abs(maxVal)))
  const spacing = Math.pow(10, magnitude)
  return spacing;
});

site.filter('parseEndYear', (value, options = {}) => {
	let bits = value.split(/-/);
	if(bits[0].length==4){
		let sy = bits[0].substr(0,2);
		let ey = bits[1];
		if(ey.length==1){
			ey = bits[0].substr(2,1)+ey;
		}
		return (sy+ey);
	}
  else{
		return "?";
	}
});

export default site;
