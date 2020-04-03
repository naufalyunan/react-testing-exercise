import React from "react"
import { render, fireEvent, waitForElement } from "@testing-library/react"
import "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import axios from "axios"
import store from "./store/index"
import App from "./App.js"

jest.mock('axios')

test('rendered correctly', async () => {
	const app = render (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
	);
	axios.get.mockResolvedValue({
		data: [{
			id: 1,
			title: 'first todo'
		}]
	})

	fireEvent.click(app.queryByTestId('link-to-todos'))
	expect(app.getByText('Your todos')).toBeInTheDocument()
	expect(app.queryByPlaceholderText('Enter your todo')).toBeInTheDocument()

	await waitForElement(() => app.getAllByRole('listitem'))

	const event = {
		target: {
			value:'testing is hard'
		}
	}

	axios.post.mockResolvedValue({
		data: {
			id: 2,
			title: event.target.value
		}
	})

	fireEvent.change(app.queryByTestId('input-form-add'), event)
	fireEvent.submit(app.queryByTestId('form-add'))

	await waitForElement(() => app.getAllByRole('listitem'))

	expect(app.queryByTestId('list-todo-container').children.length).toBe(2)
	expect(app.getByTestId('list-todo-container')).toHaveTextContent(event.target.value)
})
