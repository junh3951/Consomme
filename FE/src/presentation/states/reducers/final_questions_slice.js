import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	questions: [],
}

export const finalQuestionsSlice = createSlice({
	name: 'finalQuestions',
	initialState,
	reducers: {
		applyInput: (state, action) => {
			state.questions = action.payload
		},
	},
})

export const { applyInput } = finalQuestionsSlice.actions
export default finalQuestionsSlice.reducer
