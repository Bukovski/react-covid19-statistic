import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings } from "../../components";


describe("Settings", () => {
	describe("Settings.Language", () => {
		it("should correctly set default option",  async () => {
			const { getByText } = render(<Settings>
				<Settings.Language/>
			</Settings>);
			
			expect(getByText("RU").selected).toBeTruthy();
			expect(getByText("EN").selected).toBeFalsy();
			expect(screen.getAllByRole('option').length).toBe(2)
		})
		
		it("should correctly set props language",  async () => {
			const { getByText } = render(<Settings>
				<Settings.Language language="en"/>
			</Settings>);
			
			expect(getByText("RU").selected).toBeFalsy();
			expect(getByText("EN").selected).toBeTruthy();
		})
		
		it('change current language', () => {
			const handleLanguage = jest.fn()
			
			const { getByRole, getByText } = render(<Settings>
				<Settings.Language
					language="en"
					handleLanguageChange={ handleLanguage }
				/>
			</Settings>);
			
			expect(getByText("EN").selected).toBeTruthy();
			
			userEvent.selectOptions(getByRole('combobox'), "ru");
			
			expect(handleLanguage).toHaveBeenCalledTimes(1);
		})
	});
	
	describe("Settings.Theme", () => {
		it("should correctly set default option",  async () => {
			const { getByText } = render(<Settings>
				<Settings.Theme/>
			</Settings>);
			
			expect(getByText("Light").selected).toBeTruthy();
			expect(getByText("Dark").selected).toBeFalsy();
			expect(screen.getAllByRole('option').length).toBe(2)
		})
		
		it("should correctly set props theme",  async () => {
			const { getByText } = render(<Settings>
				<Settings.Theme theme="dark"/>
			</Settings>);
			
			expect(getByText("Light").selected).toBeFalsy();
			expect(getByText("Dark").selected).toBeTruthy();
		})
		
		it('change current theme', () => {
			const handleTheme = jest.fn()
			
			const { getByRole, getByText } = render(<Settings>
				<Settings.Theme
					theme="dark"
					handleThemeChange={ handleTheme }
				/>
			</Settings>);
			
			expect(getByText("Dark").selected).toBeTruthy();
			
			userEvent.selectOptions(getByRole('combobox'), "light");
			
			expect(handleTheme).toHaveBeenCalledTimes(1);
		})
	})
})