"use client"

import { Bell, Settings, Search, BarChart3, QrCode, Send, Home, CreditCard, User } from "lucide-react"
//import Image from "MobiPago\assets\image.png"

export default function Component() {
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-[#257beb] to-[#93d2fd] min-h-screen text-white relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <div className="w-4 h-3 ml-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M3 7H21L19 21H5L3 7Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="w-6 h-3 border border-white rounded-sm ml-1">
            <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white">




          </div>
          <div>
            <p className="text-white/90 text-sm">Bienvenido de vuelta,</p>
            <h1 className="text-xl font-bold text-[#232533]">Carlos R. Lucar</h1>
          </div>
        </div>
        <div className="w-12 h-12 bg-[#82c7ff] rounded-2xl flex items-center justify-center">
          <Bell className="w-6 h-6 text-[#232533]" />
        </div>
      </div>

      {/* Movements Section */}
      <div className="mx-6 mt-6 bg-[#93d2fd] rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Movimientos</h2>
          <button className="text-[#0066ff] font-semibold">Ver Todo</button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-[#232533]/20">
            <div>
              <p className="font-semibold text-[#232533]">Carlos R. Lucar</p>
              <p className="text-sm text-[#232533]/70">12/05/2025 - 11:15 am</p>
            </div>
            <p className="font-bold text-[#232533]">S/ 5.00</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#232533]/20">
            <div>
              <p className="font-semibold text-[#232533]">Carlos R. Lucar</p>
              <p className="text-sm text-[#232533]/70">12/05/2025 - 10:15 am</p>
            </div>
            <p className="font-bold text-[#ff0000]">- S/ 15.00</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#232533]/20">
            <div>
              <p className="font-semibold text-[#232533]">*** *** 156</p>
              <p className="text-sm text-[#232533]/70">12/05/2025 - 10:15 am</p>
            </div>
            <p className="font-bold text-[#232533]">S/ 20.00</p>
          </div>

          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-[#232533]">Humberto A. Linarez</p>
              <p className="text-sm text-[#232533]/70">12/05/2025 - 10:15 am</p>
            </div>
            <p className="font-bold text-[#232533]">S/ 100.00</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between px-6 mt-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#82c7ff] rounded-2xl flex items-center justify-center mb-2">
            <Settings className="w-8 h-8 text-[#232533]" />
          </div>
          <span className="text-sm font-semibold text-[#232533]">Ajustes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#82c7ff] rounded-2xl flex items-center justify-center mb-2">
            <Search className="w-8 h-8 text-[#232533]" />
          </div>
          <span className="text-sm font-semibold text-[#232533]">Transacciones</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#82c7ff] rounded-2xl flex items-center justify-center mb-2">
            <BarChart3 className="w-8 h-8 text-[#232533]" />
          </div>
          <span className="text-sm font-semibold text-[#232533]">Estadísticas</span>
        </div>
      </div>

      {/* Balance */}
      <div className="mx-6 mb-4">
        <div className="bg-[#0066ff] rounded-2xl p-6 text-center">
          <p className="text-white text-xl font-bold">Saldo disponible S/.12.000</p>
        </div>
      </div>

      {/* QR and Send Buttons */}
      <div className="flex gap-4 px-6 mb-8">
        <button className="flex-1 bg-[#0066ff] rounded-2xl py-4 px-6 flex items-center justify-center gap-2">
          <QrCode className="w-6 h-6 text-white" />
          <span className="text-white font-semibold">Mostrar QR</span>
        </button>
        <button className="flex-1 bg-[#0066ff] rounded-2xl py-4 px-6 flex items-center justify-center gap-2">
          <span className="text-white font-semibold">Enviar</span>
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#82c7ff] rounded-t-3xl px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <Home className="w-6 h-6 text-[#232533] mb-1" />
            <span className="text-xs font-semibold text-[#232533]">Inicio</span>
          </div>
          <div className="flex flex-col items-center">
            <CreditCard className="w-6 h-6 text-[#232533] mb-1" />
            <span className="text-xs font-semibold text-[#232533]">Mis tarjetas</span>
          </div>
          <div className="flex flex-col items-center">
            <User className="w-6 h-6 text-[#232533] mb-1" />
            <span className="text-xs font-semibold text-[#232533]">Mi Perfil</span>
          </div>
        </div>
      </div>
    </div>
  )
}
