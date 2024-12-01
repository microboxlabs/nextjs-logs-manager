import { POST } from "../../app/api/auth/route";
import { createMocks } from "node-mocks-http";

function createMockRequest(body: Record<string, any>) {
  const { req } = createMocks({
    method: "POST",
  });

  req.json = async () => body; 
  return req;
}

test("should return error if credentials are invalid", async () => {
  const req = createMockRequest({ username: "invalid", password: "invalid" });

  const res = await POST(req);

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({ error: "Credenciales inválidas" });
});

test("should log in successfully if credentials are valid", async () => {
  const req = createMockRequest({ username: "admin", password: "admin" });

  const res = await POST(req);

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Iniciado correctamente" });
  expect(res.headers.get("set-cookie")).toBeDefined();
});