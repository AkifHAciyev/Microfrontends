import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();

import Pricing from './components/Pricing';
import ProductsQuery from './components/ProductsQuery';

export default () => {
	return (
		<div>
			<StylesProvider>
				<QueryClientProvider client={client}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/pricing" component={Pricing} />
							<Route path="/" component={ProductsQuery} />
						</Switch>
					</BrowserRouter>
				</QueryClientProvider>
			</StylesProvider>
		</div>
	);
};
