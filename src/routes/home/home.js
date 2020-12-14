import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style.css';

const Home = () => {
	const [childrenCount, setChildrenCount] = useState(0);

	const handleInputChange = (value, setterCallback) => {
		if (typeof value === 'string' && value.trim() !== '') {
			setterCallback(value);
		}
	}

	return (
		<div class={style.home}>
			<h1>Pocket Money Tracker</h1>

			<p>How many children you have ?</p>
			<input type="number" onInput={(e) => handleInputChange(e.target.value, setChildrenCount)} />

			<p>Add the current pocket money you give to your children : </p>

		</div>
	);
}

export default Home;
