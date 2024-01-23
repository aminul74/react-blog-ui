import React from "react";
import { render } from "@testing-library/react";
import InputField from "../../components/InputField";

describe("InputField", () => {
  test("Test:1 InputField handled by user input", () => {
    const mockRegister = jest.fn();
    render(
      <InputField
        label="Username"
        id="username"
        type="text"
        autoComplete="username"
        register={mockRegister}
      />
    );
    expect(mockRegister).toHaveBeenCalledWith("username");
  });
});
