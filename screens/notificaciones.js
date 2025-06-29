import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons } from "@expo/vector-icons"

// Componente de notificación individual
const NotificationCard = ({ notification }) => {
  return (
    <View style={styles.notificationCard}>
      <View style={styles.notificationIcon}>
        <Ionicons name="notifications" size={24} color="#ffffff" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.titulo}</Text>
        <Text style={styles.notificationMessage}>{notification.mensaje}</Text>
        <Text style={styles.notificationTime}>{notification.tiempo}</Text>
      </View>
    </View>
  )
}

export default function Notificaciones({ navigation }) {
  const { perfil, getTransaccionesFormateadas } = usePerfil()

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  // Función para calcular el tiempo transcurrido
  const calcularTiempoTranscurrido = (fecha, hora) => {
    try {
      // Convertir fecha y hora a objeto Date
      const [dia, mes, año] = fecha.split("/")
      const [horas, minutos] = hora.split(":")
      const fechaTransaccion = new Date(año, mes - 1, dia, horas, minutos)
      const ahora = new Date()

      const diferencia = ahora - fechaTransaccion
      const minutosDiferencia = Math.floor(diferencia / (1000 * 60))
      const horasDiferencia = Math.floor(diferencia / (1000 * 60 * 60))
      const diasDiferencia = Math.floor(diferencia / (1000 * 60 * 60 * 24))

      if (minutosDiferencia < 60) {
        return minutosDiferencia <= 1 ? "hace 1 minuto" : `hace ${minutosDiferencia} minutos`
      } else if (horasDiferencia < 24) {
        return horasDiferencia === 1 ? "hace 1 hora" : `hace ${horasDiferencia} horas`
      } else {
        return diasDiferencia === 1 ? "hace 1 día" : `hace ${diasDiferencia} días`
      }
    } catch (error) {
      return "hace un momento"
    }
  }

  // Función para generar notificaciones basadas en las transacciones
  const generarNotificaciones = () => {
    const transaccionesFormateadas = getTransaccionesFormateadas()

    if (!transaccionesFormateadas || transaccionesFormateadas.length === 0) {
      return []
    }

    return transaccionesFormateadas.map((transaccion, index) => {
      const monto = Math.abs(transaccion.monto)
      const tiempo = calcularTiempoTranscurrido(transaccion.fecha, transaccion.hora)

      if (transaccion.tipoTransaccion === "recibido") {
        return {
          id: transaccion.id || index,
          titulo: "¡Recarga exitosa!",
          mensaje: `Tu saldo ha aumentado S/.${monto.toFixed(2)} de ${transaccion.nombreContacto}`,
          tiempo: tiempo,
          tipo: "recibido",
        }
      } else {
        return {
          id: transaccion.id || index,
          titulo: "¡Pago exitoso!",
          mensaje: `Has enviado S/.${monto.toFixed(2)} a ${transaccion.nombreContacto}`,
          tiempo: tiempo,
          tipo: "enviado",
        }
      }
    })
  }

  // Generar notificaciones adicionales basadas en el contexto
  const generarNotificacionesAdicionales = () => {
    const notificacionesAdicionales = []

    // Notificación de saldo actual
    if (perfil.balance > 10000) {
      notificacionesAdicionales.push({
        id: "saldo_alto",
        titulo: "¡Saldo disponible!",
        mensaje: `Tienes S/.${perfil.balance.toLocaleString("es-PE", { minimumFractionDigits: 2 })} disponibles`,
        tiempo: "hace 2 horas",
        tipo: "informativo",
      })
    }

    return notificacionesAdicionales
  }

  const notificaciones = [...generarNotificaciones(), ...generarNotificacionesAdicionales()].sort((a, b) => {
    // Ordenar por ID descendente para mostrar las más recientes primero
    return (b.id || 0) - (a.id || 0)
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notificaciones.length > 0 ? (
          notificaciones.map((notification, index) => (
            <NotificationCard key={`${notification.id}-${index}`} notification={notification} />
          ))
        ) : (
          <View style={styles.noNotifications}>
            <Ionicons name="notifications-outline" size={48} color="#999" />
            <Text style={styles.noNotificationsTitle}>No hay notificaciones</Text>
            <Text style={styles.noNotificationsText}>Aquí aparecerán las notificaciones de tus transacciones</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93d2fd",
  },
  header: {
    backgroundColor: "#257beb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(147, 210, 253, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#000000",
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1e1e2d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
    lineHeight: 22,
  },
  notificationTime: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },
  noNotifications: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  noNotificationsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
})
