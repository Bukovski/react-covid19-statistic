import React from 'react';
import { render, screen } from "@testing-library/react";

import { Info } from "../../components";
import { mockStatistic } from "../../__mocks__/axios-statistic.mock";
import expect from "expect";



describe.only("Info", () => {
	it("render page with props", () => {
		const { container, queryAllByText } = render(<Info data={ mockStatistic }/>);
		
		expect(queryAllByText(/3 ноября 2021/)).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
	})
})