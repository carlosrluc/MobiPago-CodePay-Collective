import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function PreguntasFrecuentes({ navigation }) {
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
        <Text style={styles.headerTitle}>Preguntas Frecuentes</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          <Text style={styles.title}>Preguntas Frecuentes</Text>
          <Text style={styles.subtitle}>Encuentra respuestas a las dudas más comunes sobre MobiPago</Text>

          <Text style={styles.question}>1. ¿Qué es MobiPago?</Text>
          <Text style={styles.answer}>
            MobiPago es una billetera digital que te permite enviar y recibir dinero, pagar servicios, y realizar
            compras de forma segura desde tu teléfono móvil. Es una solución completa para tus transacciones financieras
            diarias.
          </Text>

          <Text style={styles.question}>2. ¿Cómo me registro en MobiPago?</Text>
          <Text style={styles.answer}>
            Para registrarte necesitas tu número de teléfono móvil y correo electrónico. Descarga la aplicación, ingresa
            tus datos, verifica tu número con el código SMS que recibirás, y crea un PIN de seguridad. ¡Es muy fácil y
            rápido!
          </Text>

          <Text style={styles.question}>3. ¿Es seguro usar MobiPago?</Text>
          <Text style={styles.answer}>
            Sí, MobiPago es completamente seguro. Utilizamos encriptación de nivel bancario, autenticación de dos
            factores, y todas las transacciones están protegidas con tu PIN personal. Además, monitoreamos
            constantemente las transacciones para detectar actividades sospechosas.
          </Text>

          <Text style={styles.question}>4. ¿Cómo puedo agregar dinero a mi cuenta?</Text>
          <Text style={styles.answer}>
            Puedes agregar dinero de varias formas: transferencia bancaria desde tu cuenta, depósito en agentes
            autorizados, recarga con tarjeta de débito o crédito, o recibiendo dinero de otros usuarios de MobiPago.
          </Text>

          <Text style={styles.question}>5. ¿Puedo enviar dinero a cualquier persona?</Text>
          <Text style={styles.answer}>
            Puedes enviar dinero a cualquier persona que tenga una cuenta de MobiPago usando su número de teléfono. Si
            la persona no tiene cuenta, recibirá un mensaje con instrucciones para registrarse y recibir el dinero.
          </Text>

          <Text style={styles.question}>6. ¿Qué servicios puedo pagar con MobiPago?</Text>
          <Text style={styles.answer}>
            Puedes pagar una amplia variedad de servicios: luz, agua, gas, teléfono, internet, cable, seguros,
            préstamos, recargas de celular, universidades, colegios, y muchos más. La lista se actualiza constantemente.
          </Text>

          <Text style={styles.question}>7. ¿Hay límites en las transacciones?</Text>
          <Text style={styles.answer}>
            Sí, por seguridad existen límites: máximo S/ 500 por transacción, S/ 2,000 diarios, y S/ 20,000 mensuales.
            Estos límites pueden aumentar verificando tu identidad con documentos adicionales.
          </Text>

          <Text style={styles.question}>8. ¿Qué hago si olvido mi contraseña o PIN?</Text>
          <Text style={styles.answer}>
            Si olvidas tu PIN, puedes restablecerlo desde la pantalla de inicio de sesión usando la opción "Olvidé mi
            PIN". Recibirás un código de verificación por SMS para crear un nuevo PIN de forma segura.
          </Text>

          <Text style={styles.question}>9. ¿Puedo usar MobiPago sin conexión a internet?</Text>
          <Text style={styles.answer}>
            No, MobiPago requiere conexión a internet para funcionar ya que todas las transacciones se procesan en
            tiempo real por seguridad. Puedes usar datos móviles o WiFi.
          </Text>

          <Text style={styles.question}>10. ¿Qué hago si hay un error en mi transacción?</Text>
          <Text style={styles.answer}>
            Si hay un error, contacta inmediatamente a nuestro soporte. Todas las transacciones quedan registradas y
            podemos rastrear cualquier problema. Guarda siempre el comprobante de tus transacciones.
          </Text>

          <Text style={styles.question}>11. ¿Puedo cancelar una transacción ya enviada?</Text>
          <Text style={styles.answer}>
            Las transacciones son instantáneas y no se pueden cancelar una vez confirmadas. Sin embargo, puedes
            solicitar al destinatario que te devuelva el dinero. Para pagos de servicios, contacta al proveedor
            directamente.
          </Text>

          <Text style={styles.question}>12. ¿MobiPago tiene costos o comisiones?</Text>
          <Text style={styles.answer}>
            MobiPago es gratuito para enviar dinero entre usuarios. Algunos servicios como recargas o pagos de servicios
            pueden tener una pequeña comisión que se muestra antes de confirmar la transacción.
          </Text>

          <Text style={styles.question}>13. ¿Cómo puedo actualizar mi información personal?</Text>
          <Text style={styles.answer}>
            Ve a "Mi Perfil" en el menú principal, luego selecciona "Editar Información". Puedes actualizar tu nombre,
            correo, foto de perfil y otros datos. Algunos cambios pueden requerir verificación adicional.
          </Text>

          <Text style={styles.question}>14. ¿Qué hago si pierdo mi teléfono?</Text>
          <Text style={styles.answer}>
            Contacta inmediatamente a nuestro soporte para bloquear temporalmente tu cuenta. Cuando tengas un nuevo
            teléfono, podrás recuperar tu cuenta con tu número y correo electrónico registrados.
          </Text>

          <Text style={styles.question}>15. ¿Puedo tener múltiples cuentas de MobiPago?</Text>
          <Text style={styles.answer}>
            No, por políticas de seguridad y regulaciones financieras, cada persona puede tener solo una cuenta de
            MobiPago asociada a su número de teléfono y documento de identidad.
          </Text>

          <Text style={styles.contactText}>
            ¿No encontraste la respuesta que buscabas? Contacta a nuestro equipo de soporte y te ayudaremos con gusto.
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
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#257beb",
    marginTop: 20,
    marginBottom: 10,
  },
  answer: {
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
