import {render, screen, cleanup, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {
    BrowserRouter as Router,
  } from "react-router-dom";

import '@testing-library/jest-dom'

import LoginComponent from "../components/LoginComponent";

describe('<LoginComponent />', () => {
    const TestLoginComponent = () => <Router><LoginComponent /></Router>;

    afterEach(cleanup);

    test('render successfully', () => {
        render(<TestLoginComponent />);
        const headerEle = screen.getByText(/Login Page/);
        expect(headerEle).toBeInTheDocument();
    })

    test('validate input fields: FIRST NAME, LAST NAME, EMAIL, PASSWORD AND SUBMIT BUTTON', async() => {
        render(<TestLoginComponent />);
        const firstNameEle = screen.getByRole('textbox', {name: /First Name/});
        const lastNameEle = screen.getByRole('textbox', {name: /Last Name/});
        const emailEle = screen.getByRole('textbox', {name: /Email Address/});
        const passwordEle = screen.getByRole('textbox', {name: /Password/});
        const submitBtnEle = screen.getByRole('button', {name: /Submit/});

        expect(firstNameEle).toBeInTheDocument();
        expect(lastNameEle).toBeInTheDocument();
        expect(emailEle).toBeInTheDocument();
        expect(passwordEle).toBeInTheDocument();
        expect(submitBtnEle).toBeInTheDocument();

        userEvent.type(firstNameEle, 'Test')
        expect(firstNameEle.getAttribute('value')).toEqual('Test');

        userEvent.type(lastNameEle, 'User')
        expect(lastNameEle.getAttribute('value')).toEqual('User');

        userEvent.type(emailEle, 'test@gmail.com')
        expect(emailEle.getAttribute('value')).toEqual('test@gmail.com');

        userEvent.type(passwordEle, 'testuser123')
        expect(passwordEle.getAttribute('value')).toEqual('testuser123');

        userEvent.click(submitBtnEle);
    })
})
