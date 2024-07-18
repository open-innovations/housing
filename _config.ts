import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
// import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({
    src: './src',
    // TODO Update this with the proper URL
    location: new URL("https://open-innovations.github.io/housing/"),
  });

site.use(base_path());
// site.use(date());
site.use(metas({
    defaultPageData: {
      title: 'title', // Use the `date` value as fallback.
    },
  }));
site.use(postcss());

export default site;
