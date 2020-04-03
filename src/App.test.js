import React from	'react'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/react'
import { render } from '@testing-library/react'

test('App rendered', () => {
	const app = render (
		<Router>
			<App />
		</Router>
	)
	expect(app.getByText('Todo App')).toBeInTheDocument()
	expect(app.getByText(/Welcome/)).toBeInTheDocument()
	expect(app.getByTestId('link-to-home')).toBeInTheDocument()
	expect(app.getByTestId('link-to-todos')).toBeInTheDocument()
})

test('snapshot matched', () => {
	const app = render (
		<Router>
			<App />
		</Router>
	)
	expect(app).toMatchSnapshot()
})