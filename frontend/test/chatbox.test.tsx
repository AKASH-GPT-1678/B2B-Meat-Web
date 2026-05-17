
import {render , screen} from "@testing-library/react";
import ContactPage from "@/app/appcomponents/Contact";
import "@testing-library/jest-dom";



    test("Check All Inputs By Placeholder", () => {
    render(<ContactPage />);

    const fullNameInput = screen.getByPlaceholderText(
        "Enter your full name"
    );

    const businessNameInput = screen.getByPlaceholderText(
        "Enter your business name"
    );

    const emailInput = screen.getByPlaceholderText(
        "Enter your email address"
    );

    const messageInput = screen.getByPlaceholderText(
        "Write your message here"
    );

    expect(fullNameInput).toBeInTheDocument();
    expect(businessNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
});


