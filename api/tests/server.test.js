const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../src/server.js");

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH = "/challenge";
const METHOD_GET = "GET";

// allows us to make and test HTTP requests
chai.use(chaiHTTP);

const expect = chai.expect;

const expectStatus = (expected, res, method) => {
  if (expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
    throw new Error(
      "The expected status should be something other than " +
        `${STATUS_SERVER_ERROR} and ${STATUS_NOT_FOUND}`
    );
  }

  switch (res.status) {
    case STATUS_SERVER_ERROR:
      throw new Error(
        `El servidor arrojó un error durante la ejecución del request ${method} ${PATH} (status code ` +
          "500)"
      );

    case STATUS_NOT_FOUND:
      throw new Error(
        `El handler para el request ${method} ${PATH} no se encuentra implementado (status ` +
          "code 404)"
      );

    default:
      if (expected !== res.status) {
        const msg =
          `Expected status ${expected} but got ${res.status} from ` +
          `${method} ${PATH}`;
        throw new Error(msg);
      }

      /* eslint no-unused-expressions: 0 */
      // This is the correct way to make the expectation, even though it seems odd.
      expect(res).to.be.json;

      if (expected === STATUS_USER_ERROR) {
        expect(res.body).to.have.property("error");
      }
  }
};

const req = (method, status, body = null, path = PATH) => {
  const property = method.toLowerCase();
  let request = chai.request(server.server)[property](path);

  if (body) {
    request = request.send(body);
  }

  return request
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    })
    .then((res) => {
      expectStatus(status, res, method);
      return res.body;
    });
};

describe("Get Request", () => {
  describe(`${METHOD_GET} ${PATH}`, () => {
    it("Respuesta objeto", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res).to.be.an("object")
      );
    });
    it("Tiene propiedad matches", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res).to.have.property("matches")
      );
    });
    it("Tiene propiedad originLocations", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res).to.have.property("originLocations")
      );
    });
    it("Tiene propiedad time", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res).to.have.property("time")
      );
    });
    it("Matches tiene 3 elementos", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res.matches).to.have.length(3)
      );
    });
    it("OriginLocations tiene 41 elementos", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res.originLocations).to.have.length(41)
      );
    });
    it("OriginLocations tiene propiedad id", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res.originLocations[0]).to.have.property("id")
      );
    });
    it("OriginLocations tiene propiedad locations", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res.originLocations[0]).to.have.property("locations")
      );
    });
    it("Time tiene 1 elemento", () => {
      return req(METHOD_GET, STATUS_OK).then((res) =>
        expect(res.time).to.be.a("Number")
      );
    });
  });
});
