const protocol = "https";
// const host = "3.88.177.110";
// const host = "localhost";
const host = "api.dtoub.com/api/v1";
// const host = "192.168.29.125";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port + "/api/v1" : ""}`;
const endpoint = `${protocol}://${host}${
  port ? ":" + port + "/api/v1" : ""
}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
