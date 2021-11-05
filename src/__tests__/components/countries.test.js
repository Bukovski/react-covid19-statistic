import React from 'react';
import axios from "axios";
import { queryByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Countries } from "../../components";
import { mockCountry } from "../../__mocks__/axios-statistic.mock";


jest.mock("axios");


describe("Countries", () => {
	beforeEach(() => {
		axios.get.mockResolvedValue(
			{ data: { countries: mockCountry }}
		);
	})
	
	it("change select option", async () => {
		const { getByRole, getByText } = render(<Countries/>);
		await screen.findByText(/Global/i);
		
		userEvent.selectOptions(getByRole('combobox'), "Afghanistan");
		expect(getByText("Afghanistan").selected).toBeTruthy();
	})
	
	it("fetchCountries empty selected option don't exist", async () => {
		axios.get.mockResolvedValue({ data: {} });
		
		render(<Countries/>);
		await screen.findByText(/Global/i);
		
		expect(screen.queryByText("Afghanistan")).toBeNull();
	})
	
	it("change select option call handleCountryChange function", async () => {
		const handleChange = jest.fn();
		
		const { getByRole, getByText } = render(<Countries handleCountryChange={ handleChange }/>);
		
		await screen.findByText(/Global/i);
		
		userEvent.selectOptions(getByRole('combobox'), "Afghanistan");
		expect(getByText("Afghanistan").selected).toBeTruthy();
		
		expect(handleChange).toHaveBeenCalledTimes(1);
	})
});
