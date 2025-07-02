import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function GuiaUsuario({ navigation }) {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guía de Usuario</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          <Text style={styles.title}>Guía Completa de MobiPago</Text>
          <Text style={styles.subtitle}>Todo lo que necesitas saber para usar MobiPago de manera efectiva</Text>

          <Text style={styles.sectionTitle}>1. Primeros Pasos</Text>
          <Text style={styles.text}>
            Bienvenido a MobiPago, tu billetera digital de confianza. Para comenzar a usar la aplicación, necesitas
            crear una cuenta con tu número de teléfono y correo electrónico. Una vez registrado, podrás acceder a todas
            las funcionalidades de la plataforma.
          </Text>

          <Text style={styles.sectionTitle}>2. Configuración de Perfil</Text>
          <Text style={styles.text}>
            Es importante completar tu perfil con información precisa. Ve a "Mi Perfil" desde el menú principal y
            asegúrate de:
            {"\n"}• Verificar tu número de teléfono
            {"\n"}• Confirmar tu correo electrónico
            {"\n"}• Subir una foto de perfil
            {"\n"}• Completar tus datos personales
          </Text>

          <Text style={styles.sectionTitle}>3. Agregar Dinero a tu Cuenta</Text>
          <Text style={styles.text}>
            Para usar MobiPago necesitas tener saldo en tu cuenta. Puedes agregar dinero de varias formas:
            {"\n"}• Transferencia bancaria desde tu banco
            {"\n"}• Depósito en agentes autorizados
            {"\n"}• Recarga con tarjeta de débito o crédito
            {"\n"}• Recibir dinero de otros usuarios de MobiPago
          </Text>

          <Text style={styles.sectionTitle}>4. Enviar Dinero</Text>
          <Text style={styles.text}>
            Enviar dinero es muy fácil con MobiPago:
            {"\n"}1. Toca el botón "Enviar" en la pantalla principal
            {"\n"}2. Ingresa el número de teléfono del destinatario
            {"\n"}3. Escribe el monto a enviar
            {"\n"}4. Agrega un mensaje opcional
            {"\n"}5. Confirma la transacción con tu PIN
            {"\n"}6. ¡Listo! El dinero se envía instantáneamente
          </Text>

          <Text style={styles.sectionTitle}>5. Pagar Servicios</Text>
          <Text style={styles.text}>
            Con MobiPago puedes pagar múltiples servicios:
            {"\n"}• Luz, agua, gas y teléfono
            {"\n"}• Internet y cable
            {"\n"}• Seguros y préstamos
            {"\n"}• Recargas de celular
            {"\n"}• Universidades y colegios
            {"\n"}
            {"\n"}Solo selecciona el servicio, ingresa tu código de cliente y el monto, y confirma el pago.
          </Text>

          <Text style={styles.sectionTitle}>6. Usar Códigos QR</Text>
          <Text style={styles.text}>
            Los códigos QR hacen los pagos más rápidos:
            {"\n"}• Para pagar: Escanea el QR del comercio
            {"\n"}• Para cobrar: Muestra tu QR personal
            {"\n"}• Para enviar: Escanea el QR de otro usuario
            {"\n"}
            {"\n"}Accede a estas funciones desde los botones "Escanear QR" y "Mostrar QR" en la pantalla principal.
          </Text>

          <Text style={styles.sectionTitle}>7. Gestionar Tarjetas</Text>
          <Text style={styles.text}>
            En la sección "Tarjetas" puedes:
            {"\n"}• Ver todas tus tarjetas registradas
            {"\n"}• Agregar nuevas tarjetas de débito o crédito
            {"\n"}• Establecer una tarjeta como predeterminada
            {"\n"}• Eliminar tarjetas que ya no uses
            {"\n"}• Ver el historial de transacciones por tarjeta
          </Text>

          <Text style={styles.sectionTitle}>8. Revisar tu Historial</Text>
          <Text style={styles.text}>
            Mantén control de tus finanzas revisando tu historial:
            {"\n"}• Ve todas tus transacciones recientes
            {"\n"}• Filtra por tipo de operación
            {"\n"}• Busca transacciones específicas
            {"\n"}• Descarga comprobantes de pago
            {"\n"}• Revisa el estado de tus operaciones
          </Text>

          <Text style={styles.sectionTitle}>9. Estadísticas y Análisis</Text>
          <Text style={styles.text}>
            La sección "Estadísticas" te ayuda a entender tus hábitos de gasto:
            {"\n"}• Gráficos de ingresos y gastos mensuales
            {"\n"}• Categorización automática de gastos
            {"\n"}• Comparación entre diferentes períodos
            {"\n"}• Metas de ahorro personalizadas
          </Text>

          <Text style={styles.sectionTitle}>10. Seguridad y Protección</Text>
          <Text style={styles.text}>
            Tu seguridad es nuestra prioridad:
            {"\n"}• Usa un PIN seguro y único
            {"\n"}• Activa las notificaciones de transacciones
            {"\n"}• No compartas tu información de acceso
            {"\n"}• Reporta inmediatamente cualquier actividad sospechosa
            {"\n"}• Mantén actualizada la aplicación
          </Text>

          <Text style={styles.sectionTitle}>11. Configuración y Ajustes</Text>
          <Text style={styles.text}>
            Personaliza MobiPago según tus necesidades:
            {"\n"}• Cambia tu PIN de seguridad regularmente
            {"\n"}• Configura límites de transacción
            {"\n"}• Activa o desactiva notificaciones
            {"\n"}• Actualiza tu información personal
            {"\n"}• Gestiona la privacidad de tu cuenta
          </Text>

          <Text style={styles.sectionTitle}>12. Límites y Restricciones</Text>
          <Text style={styles.text}>
            Ten en cuenta estos límites para planificar mejor:
            {"\n"}• Límite diario de envío: S/ 2,000
            {"\n"}• Límite mensual: S/ 20,000
            {"\n"}• Monto mínimo por transacción: S/ 1.00
            {"\n"}• Máximo por transacción: S/ 500
            {"\n"}
            {"\n"}Estos límites pueden aumentar verificando tu identidad.
          </Text>

          <Text style={styles.sectionTitle}>13. Resolución de Problemas</Text>
          <Text style={styles.text}>
            Si tienes problemas con la aplicación:
            {"\n"}• Verifica tu conexión a internet
            {"\n"}• Asegúrate de tener la última versión
            {"\n"}• Reinicia la aplicación
            {"\n"}• Contacta a soporte si el problema persiste
            {"\n"}• Revisa las preguntas frecuentes
          </Text>

          <Text style={styles.sectionTitle}>14. Consejos y Mejores Prácticas</Text>
          <Text style={styles.text}>
            Para aprovechar al máximo MobiPago:
            {"\n"}• Revisa regularmente tu saldo y transacciones
            {"\n"}• Usa códigos QR para pagos más rápidos
            {"\n"}• Configura recordatorios para pagos recurrentes
            {"\n"}• Aprovecha las promociones y descuentos
            {"\n"}• Mantén actualizada tu información de contacto
          </Text>

          <Text style={styles.contactText}>
            ¿Necesitas más ayuda? Contacta a nuestro equipo de soporte a través de la sección "Soporte" en el menú
            principal.
          </Text>
        </View>
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
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
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
  contentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#257beb",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 25,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#257beb",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: "#257beb",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
    fontStyle: "italic",
  },
})
