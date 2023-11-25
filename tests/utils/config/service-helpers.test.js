import {
  servicesFromConfig
} from "../../../src/utils/config/service-helpers";
import {expect, it, describe, jest } from "@jest/globals";
import fs from "fs";

jest.mock("../../../src/utils/logger");
jest.mock("../../../src/utils/config/config.js");

describe("Test servicesFromConfig", () => {
  it("reads services.yaml correctly", async () => {

    const mocked_docker_yaml = `
    - My First Group:
      - My First Service:
        href: http://localhost/
        description: Homepage is awesome
    `;
    fs.promises.readFile = jest.fn();
    fs.promises.readFile.mockImplementation(async () =>
      Promise.resolve(mocked_docker_yaml)
    );

    const result = await servicesFromConfig();
    const expectedResult = [{name: "My First Group", services: [{name: "My First Service", type: "service", weight: 100}]}];

    expect(result).toEqual(expectedResult);
  });
});

