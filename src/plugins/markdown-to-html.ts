import markdownit from "markdown-it";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import shell from 'highlight.js/lib/languages/shell';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import yaml from 'highlight.js/lib/languages/yaml';
import diff from 'highlight.js/lib/languages/diff';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('c', c);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('diff', diff);


export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdownToHtml(markdownStr: string) {
        const md = markdownit({
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (__) {}
            }
        
            return ''; // use external default escaping
          }
        });
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
