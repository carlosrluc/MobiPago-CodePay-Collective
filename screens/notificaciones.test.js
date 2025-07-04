import React from "react"
import { render, screen } from "@testing-library/react-native"
import Notificaciones from "../screens/notificaciones"
import { PerfilProvider } from "../context/PerfilContext"
import { perfiles } from "../data/dummy-data"

// Mock de navegación
const mockNavigation = {
  goBack: jest.fn(),
}

// Mock personalizado del contexto
jest.mock("../context/PerfilContext", () => {
  const originalModule = jest.requireActual("../context/PerfilContext")
  const perfilMock = {
    ...originalModule,
    usePerfil: () => {
      return {
        perfil: {
          ...perfiles[1], // Carlos R. Lucar
          balance: 12000,
        },
        getTransaccionesFormateadas: () => [
          {
            id: 1,
            tipoTransaccion: "recibido",
            monto: 150.0,
            nombreContacto: "Juan Pérez",
            fecha: "03/07/2025",
            hora: "10:30",
          },
          {
            id: 2,
            tipoTransaccion: "enviado",
            monto: 75.5,
            nombreContacto: "Tienda XYZ",
            fecha: "02/07/2025",
            hora: "15:45",
          },
        ],
      }
    },
  }
  return perfilMock
})

describe("Pantalla Notificaciones", () => {
  it("renderiza correctamente con notificaciones", () => {
    render(<Notificaciones navigation={mockNavigation} />)

    expect(screen.getByText("Notificaciones")).toBeTruthy()
    expect(screen.getByText("¡Recarga exitosa!")).toBeTruthy()
    expect(screen.getByText(/Tu saldo ha aumentado/i)).toBeTruthy()
    expect(screen.getByText("¡Pago exitoso!")).toBeTruthy()
    expect(screen.getByText(/Has enviado/i)).toBeTruthy()
    expect(screen.getByText("¡Saldo disponible!")).toBeTruthy()
    expect(screen.getByText(/Tienes S\/\.12,000\.00 disponibles/i)).toBeTruthy()
  })

  it("muestra el mensaje cuando no hay transacciones", () => {
    // se mockea nuevamente el hook con transacciones vacías
    jest.mocked(require("../context/PerfilContext")).usePerfil.mockReturnValueOnce({
      perfil: {
        ...perfiles[0],
        balance: 800,
      },
      getTransaccionesFormateadas: () => [],
    })

    render(<Notificaciones navigation={mockNavigation} />)

    expect(screen.getByText("No hay notificaciones")).toBeTruthy()
    expect(screen.getByText(/Aquí aparecerán las notificaciones/i)).toBeTruthy()
  })
})
