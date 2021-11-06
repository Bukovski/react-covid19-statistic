import React from 'react';
import { render } from "@testing-library/react";

import { Info } from "../../components";
import { mockStatistic } from "../../__mocks__/axios-statistic.mock";



describe("Info", () => {
	it("render page with props", () => {
		const { container, queryAllByText } = render(<Info data={ mockStatistic }/>);
		
		expect(queryAllByText(/3 ноября 2021/)).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
	})
})