import axios from "axios";

export default async function handler(_REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "application/json");
    RESPONSE.setHeader("Vercel-CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    const TOKEN = process.env.GPL_TOKEN;

    if (TOKEN === undefined) {
      throw new Error(`"GPL_TOKEN" is not defined`);
    }

    const USERNAME = process.env.GPL_USERNAME;

    if (USERNAME === undefined) {
      throw new Error(`"GPL_USERNAME" is not defined`);
    }

    const AXIOS_RESPONSE = await axios({
      method: "post",
      url: "https://api.github.com/graphql",
      headers: {
        Authorization: `bearer ${TOKEN}`,
      },
      data: {
        query: `
          query {
            user(login: "${USERNAME}") {
              repositories(isFork: false, first: 100, orderBy: { direction: DESC, field: PUSHED_AT },
                  ownerAffiliations: OWNER, privacy: PUBLIC) {
                nodes {
                  languages(first: 10, orderBy: { direction: DESC, field: SIZE }) {
                    edges {
                      size
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      },
    });

    const IGNORE = (process.env.GPL_IGNORE ?? "").split(",");
    let sizes = { UTC: new Date().toUTCString(), totalSize: 0 };

    for (const NODE of AXIOS_RESPONSE.data.data.user.repositories.nodes) {
      for (const EDGE of NODE.languages.edges) {
        const NAME = EDGE.node.name;

        if (IGNORE.includes(NAME)) {
          continue;
        }

        const SIZE = EDGE.size;
        sizes.totalSize += SIZE;
        sizes[NAME] = (sizes[NAME] ?? 0) + SIZE;
      }
    }

    RESPONSE.send(JSON.stringify(sizes));
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
