import React from "react";
import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Pages/Login";
import {BrowserRouter as Router} from 'react-router-dom';


it(`tChecking Text By getByLabelText`, () => {
    const {getByLabelText} =render(<Router><Login /></Router>);
    const childElement = screen.getByLabelText("Email");
    expect(childElement).toBeTruthy();
  })


  it(`Checking Text By getByText`, () => {
    const {getByText} =render(<Router><Login /></Router>);
    const childElement = screen.getByText("Get Access to Your Orders,Wishlist & Recommendations");
    expect(childElement).toBeTruthy();
  })

  it(`Checking Text By getByPlaceholderText`, () => {
    const {getByPlaceholderText} =render(<Router><Login /></Router>);
    const childElement = screen.getByPlaceholderText("Name");
    expect(childElement).toBeTruthy();
  })

  it(`Checking Text By getByAltText`, () => {
    const {getByAltText} =render(<Router><Login /></Router>);
    const childElement = screen.getByAltText("passwordEye");
    expect(childElement).toBeTruthy();
  })

  describe("Test the Login Component",()=>{
      test("Render teh Login Form with  2 button",async ()=>{
        render(<Router><Login /></Router>);
        const buttonList =  await screen.findAllByRole("button")
        console.log(buttonList)
        expect(buttonList).toHaveLength(2) 
      })
  })

  describe("Testing Login", () => {
    test("inputs should be initially empty", () => {
      render(<Router><Login /></Router>);
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByLabelText("Password");
      expect(
        screen.getByText(
          /Get Access to Your Orders,Wishlist & Recommendations/
        )
      ).toBeInTheDocument();
  
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    })
  })



  test("For password validation", async () => {
    render(<Router><Login /></Router>);
    const nameInput = screen.getByLabelText("Name");
    const passwordInput = screen.getByLabelText("Password");
    const emailInput = screen.getByLabelText("Email");
    const submitBtn = screen.getAllByRole("button");
    const loginButton = submitBtn[1]
    
    await userEvent.type(nameInput, "Rajat");
    await userEvent.type(emailInput, "rajat@gmail.com");
    await userEvent.type(passwordInput, "1234");

    userEvent.click(loginButton);

    expect(
      screen.queryByText(/Password should be Greater than 6 characters/)
    ).toBeInTheDocument();

    await userEvent.type(passwordInput, "1234567");

    userEvent.click(loginButton);

    expect(
      screen.queryByText(/Password should be Greater than 6 characters/)
    ).not.toBeInTheDocument();
  });

  test("For password validation spaces", async () => {
    render(<Router><Login /></Router>);
    const nameInput = screen.getByLabelText("Name");
    const passwordInput = screen.getByLabelText("Password");
    const emailInput = screen.getByLabelText("Email");
    const submitBtn = screen.getAllByRole("button");
    const loginButton = submitBtn[1]
    
    await userEvent.type(nameInput, "Rajat");
    await userEvent.type(emailInput, "rajat@gmail.com");
    await userEvent.type(passwordInput, "raj at");

    userEvent.click(loginButton);

    expect(
      screen.queryByText(/Password shouldn't contain spaces/)
    ).toBeInTheDocument();
  });