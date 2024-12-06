import { createClient } from "contentful";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const config = {
    space: runtimeConfig.ctfSpaceID,
    accessToken: runtimeConfig.ctfCdaAccessToken,
  };
  return {
    provide: {
      createCtfClient() {
        return createClient(config);
      },
    },
  };
});
