import { test, expect, jest } from "@jest/globals";

test("I can connect", () => {
  expect.assertions(1);
  const mock = jest.fn();
  const ws = new WebSocket("localhost:3001");

  ws.addEventListener("open", mock);

  expect(mock).toBeCalled();
});
