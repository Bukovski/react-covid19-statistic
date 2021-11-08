import React from 'react';
import { render, screen } from "@testing-library/react";
import { SettingsContainer } from "../../containers";
import expect from "expect";
import userEvent from "@testing-library/user-event";


describe("SettingsContainer", () => {
	it("change page language", async () => {
		const handleToggleUpdate = jest.fn();
		
		const { container } = render(<SettingsContainer onToggleUpdate={ handleToggleUpdate }/>)
		
		expect(screen.getByText("Изменить язык")).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
		
		const languageDrop = container.getElementsByTagName("select")[ 0 ];
		await userEvent.selectOptions(languageDrop, "en");
		
		expect(screen.getByText("Change Language")).toBeTruthy();

		expect(handleToggleUpdate).toHaveBeenCalled();
		expect(container.firstChild).toMatchSnapshot();
	})
	
	it("change page theme color", async () => {
		const { container } = render(<SettingsContainer/>)
		
		expect(screen.getByText("Light").selected).toBeTruthy();
		expect(screen.getByText("Dark").selected).toBeFalsy();
		
		const themeDrop = container.getElementsByTagName("select")[ 1 ];
		await userEvent.selectOptions(themeDrop, "dark");
		
		expect(screen.getByText("Light").selected).toBeFalsy();
		expect(screen.getByText("Dark").selected).toBeTruthy();
	})
})
