import React from 'react';
import useDarkMode from 'use-dark-mode';

const DarkModeCommands = () => {
	const darkMode = useDarkMode(false);

	return (
		<span>
			I work all <code>{darkMode.value ? 'night' : 'day'}</code>.
		</span>
	);
};

export default DarkModeCommands;

