import axios from 'axios';
import { useMemo, useState } from 'react';
import DataLoader from '../../components/DataLoader';
import NoRedirectForm from "../../components/NoRedirectForm";

export default function Item() {
	const [state, setState] = useState({ 
		isLoading: true, 
		isErrored: false, 
		data: null 
	});
	
	const getData = useMemo(() => [{ key: 'itemQualities', fn: () => (axios.get('http://localhost:28172/itemQualitys').then(data => data.data)) }], []);


	return (
		<main>
			<h2>Item</h2>

			<DataLoader state={state} 
						setState={setState} 
						actions={getData}>
				<NoRedirectForm id="item" 
								url="http://localhost:28172/items" 
								method="post">

					<div>
						<label htmlFor="Name">Name</label>
						<input name="Name" type="text" />
					</div>
					
                    <div>
						<label htmlFor="ItemQualityID">Item Quality</label>
						<select name="ItemQualityID" required>
							<option value="">Please choose a quality</option>
							{state.data && state.data.itemQualities.map(element => (
								<option key={element.id} value={element.id}>{element.name}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="LogoLink">Logo Link</label>
						<input name="LogoLink" type="text" />
					</div>
				</NoRedirectForm>
			</DataLoader>
		</main>
	);
};
