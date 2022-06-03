import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "../Pages/Register";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

let Elements;
const setElements = () => {
  render(<Register />);
  const firstNameInput = screen.getByLabelText("First Name");
  const lastNameInput = screen.getByLabelText("Last Name");
  const emailInput = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password");
  const registerBtn = screen.getAllByRole("button");
  const submitBtn = registerBtn[2]

  Elements = {
    firstNameInput,
    lastNameInput,
    emailInput,
    password,
    confirmPassword,
    submitBtn,
  };
};

beforeEach(() => setElements());

describe("Testing Register", () => {
  test("inputs should be initially empty", () => {
    expect(Elements.firstNameInput.value).toBe("");
    expect(Elements.lastNameInput.value).toBe("");
    expect(Elements.emailInput.value).toBe("");
    expect(Elements.password.value).toBe("");
    expect(Elements.confirmPassword.value).toBe("");
  });


});


describe("This is not a valid Email", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajatgamil");
      await userEvent.type(Elements.password, "sapient@123");
      await userEvent.type(Elements.confirmPassword, "sapient@123");
      userEvent.click(Elements.submitBtn);
      expect(screen.getByText("This is not a valid Email")).toBeInTheDocument();
  });
});

describe("Password should contain at least one integer", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajat@gmail.com");
      await userEvent.type(Elements.password, "sapient");
      await userEvent.type(Elements.confirmPassword, "sapient");
      userEvent.click(Elements.submitBtn);
      expect(screen.getByText("Password should contain at least one integer")).toBeInTheDocument();
  });
});


describe("Password should be Greater than 6 characters", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajat@gmail.com");
      await userEvent.type(Elements.password, "sap");
      await userEvent.type(Elements.confirmPassword, "sap");
      userEvent.click(Elements.submitBtn);
      expect(screen.getByText("Password should be Greater than 6 characters")).toBeInTheDocument();
  });
});

describe("Password & Confirm Password are not same", () => {
    test("inputs should be initially empty", async() => {
        await userEvent.type(Elements.firstNameInput, "Rajat");
        await userEvent.type(Elements.lastNameInput, "Tanwar");
        await userEvent.type(Elements.emailInput, "rajat@gmail.com");
        await userEvent.type(Elements.password, "sap@12345");
        await userEvent.type(Elements.confirmPassword, "sap@123456");
        userEvent.click(Elements.submitBtn);
        expect(screen.getByText("Password & Confirm Password should be same")).toBeInTheDocument();
    });
});

describe("Password shouldn't contain spaces", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajat@gmail.com");
      await userEvent.type(Elements.password, "sap @12345");
      await userEvent.type(Elements.confirmPassword, "sap @123456");
      userEvent.click(Elements.submitBtn);
      expect(screen.getByText("Password shouldn't contain spaces")).toBeInTheDocument();
  });
});

describe("Password should contain at least one Alphabet", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajat@gmail.com");
      await userEvent.type(Elements.password, "1234567");
      await userEvent.type(Elements.confirmPassword, "1234567");
      userEvent.click(Elements.submitBtn);
      expect(screen.getByText("Password should contain at least one Alphabet")).toBeInTheDocument();
  });
});

describe("Register Button is disabled when any field value is Empty", () => {
  test("inputs should be initially empty", async() => {
      await userEvent.type(Elements.firstNameInput, "Rajat");
      await userEvent.type(Elements.lastNameInput, "Tanwar");
      await userEvent.type(Elements.emailInput, "rajat@gmail.com");
      await userEvent.type(Elements.password, "1234567");
      await userEvent.type(Elements.confirmPassword, "1234567");
      expect(Elements.submitBtn).not.toHaveAttribute('disabled');
     
  });
});





