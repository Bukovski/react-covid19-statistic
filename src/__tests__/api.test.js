import axios from "axios";

import { fetchStatisticData, fetchCountries, fetchDailyData, _transformDailyData, _apiBase } from "../api";
import { mockStatistic, mockDaily, mockCountry } from '../__mocks__/axios-statistic.mock';


jest.mock("axios");


describe.only("Api", () => {
	const errorMessage = `Could not fetch`;
	
	describe("fetchStatisticData", () => {
		it("fetches successfully statistic without country", async () => {
			axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockStatistic }));
			
			await expect(fetchStatisticData()).resolves.toEqual(mockStatistic);
			
			expect(axios.get).toHaveBeenCalledWith(_apiBase);
		})
		
		it("fetches successfully statistic with country", async () => {
			axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockStatistic }));
			
			await expect(fetchStatisticData("Albania")).resolves.toEqual(mockStatistic);
			
			expect(axios.get).toHaveBeenCalledWith(`${ _apiBase }/countries/Albania`);
		})
		
		it('reject statistic country', async () => {
			axios.get.mockImplementationOnce(() =>
				Promise.reject(new Error(errorMessage)),
			);
			
			await expect(fetchStatisticData()).rejects.toThrow(errorMessage);
		});
	})
	
	describe("fetchDailyData", () => {
		let filterDailyData;
		
		beforeAll(() => {
			filterDailyData = mockDaily.map(_transformDailyData);
		});
		
		it("fetches successfully daily info", async () => {
			axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockDaily }));
			
			await expect(fetchDailyData()).resolves.toEqual(filterDailyData);
			
			expect(axios.get).toHaveBeenCalledWith(`${ _apiBase }/daily`);
		})
		
		it('reject daily info', async () => {
			axios.get.mockImplementationOnce(() =>
				Promise.reject(new Error(errorMessage)),
			);
			
			await expect(fetchDailyData()).rejects.toThrow(errorMessage);
		});
	})
	
	describe("fetchCountries", () => {
		let filterCountryData;
		
		beforeAll(() => {
			filterCountryData = mockCountry.map((country) => country.name);
		});
		
		it("fetches successfully country info", async () => {
			axios.get.mockImplementationOnce(() => Promise.resolve({ data: { countries: mockCountry } }));
			
			await expect(fetchCountries()).resolves.toEqual(filterCountryData);
			
			expect(axios.get).toHaveBeenCalledWith(`${ _apiBase }/countries`);
		})
		
		it('reject country info', async () => {
			axios.get.mockImplementationOnce(() =>
				Promise.reject(new Error(errorMessage)),
			);
			
			await expect(fetchCountries()).rejects.toThrow(errorMessage);
		});
	})
});
