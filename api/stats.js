import axios from "axios";

export default async function handler(REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "text/html");
    RESPONSE.setHeader("Cache-Control", "no-store");
    const TOKEN = process.env.GPL_TOKEN;

    if (TOKEN === undefined) {
      throw new Error(`"GPL_TOKEN" is not defined`);
    }

    const USERNAME = REQUEST.query.username ?? process.env.GPL_USERNAME;

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

    let sizes = { Total: 0 };

    for (const NODE of AXIOS_RESPONSE.data.data.user.repositories.nodes) {
      for (const EDGE of NODE.languages.edges) {
        const NAME = EDGE.node.name;
        const SIZE = EDGE.size;
        sizes.Total += SIZE;
        sizes[NAME] = (sizes[NAME] ?? 0) + SIZE;
      }
    }

    sizes = new Map(
      Object.entries(sizes).sort(([_, a], [__, b]) => {
        return b - a;
      })
    );

    let stats = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>GitHub Profile Language Stats</title>
          <style>
            body {
              margin: 32px;
              background-color: #222;
              font-size: 16px;
              color: #ddd;
            }
            table {
              border-collapse: collapse;
            }
            th,
            td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            td:nth-child(even) {
              text-align: right;
            }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <th>Languages</th>
              <th>Bytes</th>
            </tr>
    `;

    const FORMAT = new Intl.NumberFormat();

    for (const [LANGUAGE_NAME, SIZE] of sizes) {
      stats += `
        <tr>
          <td>${LANGUAGE_NAME}</td>
          <td>${FORMAT.format(SIZE)}</td>
        </tr>
      `;
    }

    RESPONSE.send(`
      ${stats}
          </table>
        </body>
      </html>
    `);
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
