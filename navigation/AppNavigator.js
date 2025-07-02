import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { TarjetasProvider } from "../context/TarjetasContext"
import { PerfilProvider } from "../context/PerfilContext"
import App from "../App"
import Statistics from "../screens/statistics"
import Tarjetas from "../screens/tarjetas"
import CrearTarjeta from "../screens/creatarjeta"
import MiPerfil from "../screens/miperfil"
import EditarInformacion from "../screens/editarinformacion"
import Notificaciones from "../screens/notificaciones"
import Soporte from "../screens/soporte"
import EscanearQR from "../screens/escanearqr"
import MostrarQR from "../screens/mostrarqr"
import EnviarPago from "../screens/enviarpago"
import TransferenciaExitosa from "../screens/transferenciaexitosa"
import PagosServicios from "../screens/pagosservicios"
import Ajustes from "../screens/ajustes"
import CambiarContrasena from "../screens/cambiarcontrasena"
import EnviarPersonas from "../screens/enviarpersonas"
import TerminosCondiciones from "../screens/terminoscondiciones"
import Historial from "../screens/historial"
import Login from "../screens/login"
import CrearCuenta from "../screens/crearcuenta"

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <PerfilProvider>
      <TarjetasProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={App} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="Tarjetas" component={Tarjetas} />
            <Stack.Screen name="CrearTarjeta" component={CrearTarjeta} />
            <Stack.Screen name="MiPerfil" component={MiPerfil} />
            <Stack.Screen name="EditarInformacion" component={EditarInformacion} />
            <Stack.Screen name="Notificaciones" component={Notificaciones} />
            <Stack.Screen name="Soporte" component={Soporte} />
            <Stack.Screen name="EscanearQR" component={EscanearQR} />
            <Stack.Screen name="MostrarQR" component={MostrarQR} />
            <Stack.Screen name="EnviarPago" component={EnviarPago} />
            <Stack.Screen name="TransferenciaExitosa" component={TransferenciaExitosa} />
            <Stack.Screen name="PagosServicios" component={PagosServicios} />
            <Stack.Screen name="Ajustes" component={Ajustes} />
            <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} />
            <Stack.Screen name="TerminosCondiciones" component={TerminosCondiciones} />
            <Stack.Screen name="EnviarPersonas" component={EnviarPersonas} />
            <Stack.Screen name="Historial" component={Historial} />
            <Stack.Screen name="CrearCuenta" component={CrearCuenta} />
          </Stack.Navigator>
        </NavigationContainer>
      </TarjetasProvider>
    </PerfilProvider>
  )
}
