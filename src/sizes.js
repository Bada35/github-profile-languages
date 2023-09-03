import axios from "axios";

async function getSizes() {
  const TOKEN = process.env.GPL_TOKEN;

  if (TOKEN === undefined) {
    throw new Error(`"GPL_TOKEN" is not defined`);
  }

  const USERNAME = process.env.GPL_USERNAME;

  if (USERNAME === undefined) {
    throw new Error(`"GPL_USERNAME" is not defined`);
  }

  const RESPONSE = await axios({
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
  let sizes = { totalSize: 0 };

  for (const NODE of RESPONSE.data.data.user.repositories.nodes) {
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

  return sizes;
}

export { getSizes };
