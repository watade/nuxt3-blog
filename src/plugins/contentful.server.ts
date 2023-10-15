import contentful from "contentful";
import { createClient } from "contentful";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const config = {
    space: runtimeConfig.ctfSpaceID,
    accessToken: runtimeConfig.ctfCdaAccessToken,
  };
  // https://github.com/contentful/contentful.js/issues/1233#issuecomment-1216175360
  const createClientFunc =
    process.env.NODE_ENV === "development"
      ? createClient
      : contentful.createClient;
  return {
    provide: {
      createCtfClient() {
        return createClientFunc(config);
      },
    },
  };
});
