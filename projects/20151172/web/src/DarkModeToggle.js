import React from 'react';

import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
	const darkMode = useDarkMode(false);

	return (
		<div className="dark-mode-toggle">
			<button type="button" onClick={darkMode.disable}>
				day
		  	</button>
		  	<Toggle checked={darkMode.value} onChange={darkMode.toggle} />
		  	<button type="button" onClick={darkMode.enable}>
		        	night
			</button>
		</div>
	);
};

export default DarkModeToggle;

