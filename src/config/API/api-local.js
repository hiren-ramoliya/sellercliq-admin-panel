const protocol = "http";
// const host = "api.dtoub.com/api/v1";
const host = "localhost";
// const host = "192.168.29.125";
const port = 8088;
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
