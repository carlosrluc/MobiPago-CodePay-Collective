import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Historial from '../screens/historial'
import { usePerfil } from '../context/PerfilContext'

// Mock de react-navigation
const mockNavigation = {
  goBack: jest.fn(),
}

// Mock del contexto
jest.mock('../context/PerfilContext', () => ({
  usePerfil: jest.fn(),
}))

const mockTransacciones = [
  {
    id: 1,
    nombreContacto: 'Juan Pérez',
    fecha: '2025-07-01',
    hora: '10:00 AM',
    monto: 100.5,
  },
  {
    id: 2,
    nombreContacto: 'Ana López',
    fecha: '2025-07-02',
    hora: '11:00 AM',
    monto: -50,
  },
]

describe('Historial Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    usePerfil.mockReturnValue({
      getTransaccionesFormateadas: () => mockTransacciones,
    })
  })

  it('muestra el título y lista las transacciones', () => {
    const { getByText } = render(<Historial navigation={mockNavigation} />)

    expect(getByText('Historial')).toBeTruthy()
    expect(getByText('Juan Pérez')).toBeTruthy()
    expect(getByText('Ana López')).toBeTruthy()
  })

  it('realiza búsqueda correctamente', async () => {
    const { getByPlaceholderText, queryByText } = render(<Historial navigation={mockNavigation} />)

    const input = getByPlaceholderText('Buscar')
    fireEvent.changeText(input, 'juan')

    await waitFor(() => {
      expect(queryByText('Juan Pérez')).toBeTruthy()
      expect(queryByText('Ana López')).toBeNull()
    })
  })

  it('muestra mensaje cuando no hay resultados', async () => {
    const { getByPlaceholderText, getByText } = render(<Historial navigation={mockNavigation} />)

    const input = getByPlaceholderText('Buscar')
    fireEvent.changeText(input, 'noexiste')

    await waitFor(() => {
      expect(getByText('No se encontraron transacciones')).toBeTruthy()
    })
  })

  it('ejecuta goBack al presionar el botón', () => {
const { getByTestId } = render(<Historial navigation={mockNavigation} />)

const boton = getByTestId('back-button')
fireEvent.press(boton)

expect(mockNavigation.goBack).toHaveBeenCalled()
  })
})
