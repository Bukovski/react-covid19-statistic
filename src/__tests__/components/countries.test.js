import React from 'react';
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Countries } from "../../components";
import { mockCountry } from "../../__mocks__/axios-statistic.mock";


jest.mock("axios");


describe("Countries", () => {
	beforeAll(() => {
		axios.get.mockResolvedValue(
			{ data: { countries: mockCountry }}
		);
	})
	
	it("change select option", async () => {
		render(<Countries/>);
		await screen.findByText(/Global/i);
		
		userEvent.selectOptions(screen.getByRole('combobox'), "Afghanistan");
		expect(screen.getByText("Afghanistan").selected).toBeTruthy();
	})
	
	it("change select option call handleCountryChange function", async () => {
		const handleChange = jest.fn();
		
		render(<Countries handleCountryChange={ handleChange }/>);
		
		await screen.findByText(/Global/i);
		
		userEvent.selectOptions(screen.getByRole('combobox'), "Afghanistan");
		expect(screen.getByText("Afghanistan").selected).toBeTruthy();
		
		expect(handleChange).toHaveBeenCalledTimes(1);
	})
	
	it("fetchCountries empty selected option don't exist", async () => {
		axios.get.mockResolvedValue({ data: {} });
		
		render(<Countries/>);
		await screen.findByText(/Global/i);
		
		expect(screen.queryByText("Afghanistan")).toBeNull();
	})
});
