import { describe, test, expect } from "@jest/globals";
import faker from "faker";
import { matchersWithOptions } from "jest-json-schema";
import { Subject, timer } from "rxjs";
import {
  first,
  filter,
  takeUntil,
  last,
} from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

import messageSchema from "../schema/clock-change.json";
import clockSchema from "../schema/clock.json";

expect.extend(matchersWithOptions({
  schemas: [clockSchema],
}));

const tap = (value, fn) => {
  fn(value);
  return value;
};

const filterType = (targetType) => filter(({ type }) => type === targetType);
const filterChanges = filterType("clock/changes");

const requestSubscription = () => ({ action: "clock/subscription/request" });
const requestChange = (clock) => ({
  action: "clock/change/request",
  payload: clock,
});

const connect = (options = {}) =>
  webSocket({
    ...options,
    url: "ws://localhost:3001",
  });

const connectAndSubscribe = () =>
  tap(connect(), (c) => c.next(requestSubscription()));

test("I can establish a connection", async () => {
  const connects$ = new Subject();
  const pendingConnect = connects$.pipe(first()).toPromise();

  connect({
    openObserver: connects$,
  }).subscribe({});

  await expect(pendingConnect).resolves.toBeDefined();
});

describe("clock subscription", () => {
  test("when a change is made, subscribers recieve a change message", async () => {
    const connections = [connectAndSubscribe(), connectAndSubscribe()];
    const pendingResponses = connections.map((c) =>
      c.pipe(filterChanges, takeUntil(timer(1000)), last()).toPromise()
    );

    connections[0].next(
      requestChange({ id: "x", label: faker.lorem.sentence() })
    );

    const responses = await Promise.all(pendingResponses);

    responses.forEach((response) => {
      expect(response).toMatchSchema(messageSchema);
    });
  });

  test("when a new subscription is requested, the client recieves all past changes", async () => {
    // 1. Make connection
    const connection = connectAndSubscribe();

    // 2. Grab first change record
    const response = await connection.pipe(filterChanges, first()).toPromise();

    expect(response.payload.length).toBeGreaterThan(0);
  });
});
