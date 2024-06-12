import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/login/page'

describe('LoginPage', () => {
    it('renders a heading', () => {
        render(<LoginPage />)

        const welcomeBack = screen.getByText('Welcome back!', { level: 1 })

        expect(welcomeBack).toBeInTheDocument()
    })
})