const request = require("supertest");
const app = require("./app");

// Test GET /health
test("GET /health retourne status ok", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("ok");
});

// Test GET /
test("GET / retourne Hello World", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Hello World");
});

// Test GET /add
test("GET /add?a=2&b=3 retourne 5", async () => {
  const res = await request(app).get("/add?a=2&b=3");
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(5);
});

// Test GET /add avec paramètres invalides
test("GET /add sans paramètres retourne 400", async () => {
  const res = await request(app).get("/add?a=abc&b=3");
  expect(res.statusCode).toBe(400);
});