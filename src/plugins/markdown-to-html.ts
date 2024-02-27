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
          const originalUrl = tokens[idx].attrGet("src") as string;
          const generatedUrl = img(originalUrl, {
            format: "webp",
            quality: 50,
          });
          tokens[idx].attrSet("src", generatedUrl);
          tokens[idx].attrPush(["loading", "lazy"]);
          return defaultRender(tokens, idx, options, env, self);
        };
        return md.render(markdownStr);
      },
    },
  };
});
