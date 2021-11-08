import React from 'react';
import axios from "axios";
import 'jest-canvas-mock';
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfoContainer } from "../../containers";
import { mockCountry, mockDaily, mockStatistic } from "../../__mocks__/axios-statistic.mock";

jest.mock("axios");


axios.get.mockImplementation((url) => {
	switch (url) {
		case 'https://covid19.mathdro.id/api':
		case 'https://covid19.mathdro.id/api/countries/Afghanistan':
			return Promise.resolve({ data: mockStatistic })
		
		case 'https://covid19.mathdro.id/api/countries':
			return Promise.resolve({ data: { countries: mockCountry } })
		
		case 'https://covid19.mathdro.id/api/daily':
			return Promise.resolve({ data: mockDaily })
		
		default:
			return Promise.reject(new Error('Could not fetch'))
	}
})

describe("InfoContainer", () => {
	it("render page with props and load all fetch data", async () => {
		const { container } = render(<InfoContainer />);
		
		expect(container.getElementsByClassName('spinner-overlay').length).toBeDefined();
		
		await act(() => axios.get('https://covid19.mathdro.id/api'));
		await expect(axios.get).toHaveBeenCalledWith(
			`https://covid19.mathdro.id/api`,
		)
		
		await act(() => axios.get('https://covid19.mathdro.id/api/countries'));
		await expect(axios.get).toHaveBeenCalledWith(
			`https://covid19.mathdro.id/api/countries`,
		)
		
		await act(() => axios.get('https://covid19.mathdro.id/api/daily'));
		await expect(axios.get).toHaveBeenCalledWith(
			`https://covid19.mathdro.id/api/daily`,
		)
		
		await expect(screen.queryAllByText(/3 ноября 2021/)).toBeTruthy();
		await expect(screen.queryByText("Afghanistan")).toBeTruthy();
		await expect(container.getElementsByClassName('chartjs-render-monitor').length).toBeDefined();
		
		expect(container.firstChild).toMatchSnapshot();
	})
	
	it("change selected country", async () => {
		render(<InfoContainer />);
		
		await act(() => axios.get('https://covid19.mathdro.id/api'));
		await act(() => axios.get('https://covid19.mathdro.id/api/countries'));
		await act(() => axios.get('https://covid19.mathdro.id/api/daily'));
		
		await screen.queryAllByText("Global");
		
		expect(screen.getByText("Global").selected).toBeTruthy();
		
		userEvent.selectOptions(screen.getByRole('combobox'), "Afghanistan");
		
		await act(() => axios.get('https://covid19.mathdro.id/api/countries/Afghanistan'));
		
		expect(screen.getByText("Afghanistan").selected).toBeTruthy();
	})
})