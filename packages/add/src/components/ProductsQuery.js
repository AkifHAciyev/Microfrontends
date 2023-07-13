import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const productsQuery = () => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		unitsInStock: '',
	});

	const { data, isLoading } = useQuery(
		'products',
		() => {
			return axios.get('https://northwind.vercel.app/api/products/').then((res) => res.data);
		},
		{
			refetchInterval: 5000,
		}
	);

	const handleDelete = (item) => {
		axios.delete('https://northwind.vercel.app/api/products/' + item.id);
	};
	const handleClick = () => {
		axios.post('https://northwind.vercel.app/api/products/', newProduct);

		setNewProduct({
			name: '',
			unitsInStock: '',
		});
	};

	if (isLoading) return <h1>loading ...</h1>;

	return (
		<React.Fragment>
			<form>
				<input
					value={newProduct.name}
					onChange={(e) =>
						setNewProduct((prevState) => {
							return {
								...prevState,
								name: e.target.value,
							};
						})
					}
					placeholder="name"
				/>
				<input
					value={newProduct.unitsInStock}
					onChange={(e) =>
						setNewProduct((prevState) => {
							return {
								...prevState,
								unitsInStock: e.target.value,
							};
						})
					}
					placeholder="unitsInStock"
				/>
				<button onClick={() => handleClick()}>Add product</button>
			</form>
			<table className="w3-table-all">
				<thead className="w3-light-grey">
					<tr>
						<th>Name</th>
						<th>unitsInStock</th>
						<th>unitPrice</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((product) => (
						<tr key={product.id}>
							<td>{product?.name}</td>
							<td>{product?.unitsInStock}</td>
							<td>{product?.unitPrice}</td>
							<td>
								<button onClick={() => handleDelete(product)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default productsQuery;
