import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings } from "../../components";


describe("Settings", () => {
	describe("Settings.Language", () => {
		it("should correctly set default option", () => {
			render(<Settings>
				<Settings.Language/>
			</Settings>);
			
			expect(screen.getByText("RU").selected).toBeTruthy();
			expect(screen.getByText("EN").selected).toBeFalsy();
			expect(screen.getAllByRole('option').length).toBe(2)
		})
		
		it("should correctly set props language", () => {
			render(<Settings>
				<Settings.Language language="en"/>
			</Settings>);
			
			expect(screen.getByText("RU").selected).toBeFalsy();
			expect(screen.getByText("EN").selected).toBeTruthy();
		})
		
		it('change current language', () => {
			const handleLanguage = jest.fn()
			
			render(<Settings>
				<Settings.Language
					language="en"
					handleLanguageChange={ handleLanguage }
				/>
			</Settings>);
			
			expect(screen.getByText("EN").selected).toBeTruthy();
			
			userEvent.selectOptions(screen.getByRole('combobox'), "ru");
			
			expect(handleLanguage).toHaveBeenCalledTimes(1);
		})
	});
	
	describe("Settings.Theme", () => {
		it("should correctly set default option",  () => {
			render(<Settings>
				<Settings.Theme/>
			</Settings>);
			
			expect(screen.getByText("Light").selected).toBeTruthy();
			expect(screen.getByText("Dark").selected).toBeFalsy();
			expect(screen.getAllByRole('option').length).toBe(2)
		})
		
		it("should correctly set props theme", () => {
			render(<Settings>
				<Settings.Theme theme="dark"/>
			</Settings>);
			
			expect(screen.getByText("Light").selected).toBeFalsy();
			expect(screen.getByText("Dark").selected).toBeTruthy();
		})
		
		it('change current theme', () => {
			const handleTheme = jest.fn()
			
			render(<Settings>
				<Settings.Theme
					theme="dark"
					handleThemeChange={ handleTheme }
				/>
			</Settings>);
			
			expect(screen.getByText("Dark").selected).toBeTruthy();
			
			userEvent.selectOptions(screen.getByRole('combobox'), "light");
			
			expect(handleTheme).toHaveBeenCalled();
		})
	})
	
	it("snapshot of the entire component", () => {
		const { container } = render(<Settings>
			<Settings.Language language="en"/>
			<Settings.Theme theme="dark"/>
		</Settings>);
		
		expect(container.firstChild).toMatchSnapshot();
	})
})