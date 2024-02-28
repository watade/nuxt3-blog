import MarkdownIt from "markdown-it";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdownToHtml(markdownStr: string) {
        const md = MarkdownIt();
        const defaultRender =
          md.renderer.rules.image ||
          function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
          };
        const img = useImage();
        // add new rendering rule for image optimization
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
          // original image url
          let originalUrl = tokens[idx].attrGet("src") as string;
          // replace domain with alias defiend in nuxt.config.ts
          for (const [key, value] of Object.entries(img.options.alias)) {
            originalUrl = originalUrl.replace(value, key);
          }
          // download images and generate src path for images
          const generatedUrl = img(originalUrl, {
            format: "webp",
            quality: 50,
          });
          // edit image tags
          tokens[idx].attrSet("src", generatedUrl);
          tokens[idx].attrPush(["loading", "lazy"]);
          return defaultRender(tokens, idx, options, env, self);
        };
        return md.render(markdownStr);
      },
    },
  };
});
