import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import final_questions_slice from './reducers/final_questions_slice'

export const store = configureStore({
	reducer: {
		finalQuestions: final_questions_slice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
})

// TypeScript 타입 정의를 제거하고 기본 훅을 그대로 사용
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default function ReduxProvider({ children }) {
	return <Provider store={store}>{children}</Provider>
}
