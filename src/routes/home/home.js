import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.css';

const Home = () => {
	const [currentChildName, setCurrentChildName] = useState('');
	const [currentChildMoney, setCurrentChildMoney] = useState(0);
	const dispatch = useDispatch();
	const children = useSelector(state => state.children);

	// on input change
	const handleInputChange = (value, setterCallback) => {
		if (typeof value === 'string' && value.trim() !== '') {
			setterCallback(value);
		}
	}

	//handle click on name to change to input element
	const handleNameClick = (e) => {
		e.target.nextElementSibling.value = e.target.innerText;
		e.target.hidden = true;
		e.target.nextElementSibling.hidden = false;
		e.target.nextElementSibling.focus();
	}

	//on update of name or other property
	const handleUpdate = (event, oldChild, propertyName) => {
		const newValue = event.target.value;
		if (newValue?.trim()) {
			dispatch({
				type: 'UPDATE_CHILD', oldName: oldChild.childName,
				newChild: { ...oldChild, [propertyName]: newValue }
			})
		}
	}

	//delete the child
	const handleDeleteChild = (childName) => {
		dispatch({
			type: 'DELETE_CHILD', childToDelete: childName
		})
	}

	//handle key down or blur event on input to change to element
	const handleKeyDownBlur = (event, oldChild, propertyName, eventType = 'keydown') => {
		if ((eventType === 'keydown' && event.keyCode === 13) || eventType === 'blur') {
			event.target.hidden = true;
			handleUpdate(event, oldChild, propertyName);
			event.target.previousElementSibling.hidden = false;
		}
	}

	const addChild = (e) => {
		e.preventDefault();
		dispatch({ type: 'ADD_CHILD', child: { childName: currentChildName, childMoney: currentChildMoney } });
	}

	return (
		<div class={style.home}>
			<h1>Pocket Money Tracker</h1>
			<p>Please provide your child's name or nickname for better record keeping</p>
			<form onSubmit={addChild}>
				<input type="text" placeholder="Enter the child name"
					value={currentChildName}
					onInput={(e) => handleInputChange(e.target.value, setCurrentChildName)} />
				<input type="number" placeholder="Enter his/her current pocket money"
					value={currentChildMoney}
					onInput={(e) => handleInputChange(e.target.value, setCurrentChildMoney)}
					min={0} />

				<button type="submit">Add</button>
			</form>

			<ul>
				{children.map((child, index) => (
					<li key={index}>
						<p onClick={(e) => handleNameClick(e)}>{child.childName}</p>
						<input type="text" value={child.childName}
							hidden={true}
							autoFocus={true}
							placeholder="Update his/her name"
							onKeyDown={e => handleKeyDownBlur(e, child, 'childName')}
							onBlur={e => handleKeyDownBlur(e, child, 'childName', 'blur')} />

						<p onClick={(e) => handleNameClick(e)}>{child.childMoney}</p>
						<input type="text" value={child.childMoney}
							hidden={true}
							autoFocus={true}
							placeholder="Edit his/her money"
							onKeyDown={e => handleKeyDownBlur(e, child, 'childMoney')}
							onBlur={e => handleKeyDownBlur(e, child, 'childMoney', 'blur')} />

						<button onClick={() => handleDeleteChild(child.childName)}>Remove his/her record</button>

					</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
