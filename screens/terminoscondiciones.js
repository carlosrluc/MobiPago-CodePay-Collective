import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function TerminosCondiciones({ navigation }) {
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
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Términos y Condiciones</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Términos y Condiciones de Uso de MobiPago</Text>
          <Text style={styles.subtitle}>Última actualización: Enero 2025</Text>

          <Text style={styles.sectionTitle}>Bienvenido a MobiPago</Text>
          <Text style={styles.paragraph}>
            MobiPago es una plataforma de billetera virtual que te permite realizar pagos electrónicos de manera rápida,
            segura y conveniente. Al utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones que
            rigen el uso de nuestra aplicación y el acceso a los servicios proporcionados por MobiPago. Si no estás de
            acuerdo con estos términos, te pedimos que no utilices nuestros servicios.
          </Text>

          <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            Al registrarte y utilizar MobiPago, aceptas cumplir con estos Términos y Condiciones, así como con cualquier
            otra política o normativa relacionada que pueda ser publicada ocasionalmente en nuestra plataforma.
          </Text>

          <Text style={styles.sectionTitle}>2. Registro y Acceso a la Cuenta</Text>
          <Text style={styles.paragraph}>
            Para utilizar los servicios de MobiPago, deberás crear una cuenta proporcionando información personal
            precisa y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta y de todas las
            actividades realizadas bajo tu cuenta. Si sospechas que tu cuenta ha sido comprometida, debes notificarnos
            inmediatamente.
          </Text>

          <Text style={styles.sectionTitle}>3. Servicios de MobiPago</Text>
          <Text style={styles.paragraph}>
            MobiPago te permite realizar pagos electrónicos, transferir dinero entre usuarios, pagar servicios y
            realizar compras en línea a través de nuestra plataforma. Nos reservamos el derecho de modificar, suspender
            o interrumpir temporalmente cualquier servicio en cualquier momento sin previo aviso.
          </Text>

          <Text style={styles.sectionTitle}>4. Métodos de Pago</Text>
          <Text style={styles.paragraph}>
            Puedes vincular tu cuenta de MobiPago con una tarjeta de débito, crédito, cuenta bancaria u otros métodos de
            pago aprobados. Asegúrate de que todos los detalles de pago proporcionados sean precisos. Nos reservamos el
            derecho de rechazar o suspender los métodos de pago fraudulentos o no verificables.
          </Text>

          <Text style={styles.sectionTitle}>5. Seguridad</Text>
          <Text style={styles.paragraph}>
            MobiPago utiliza tecnología de encriptación y otras medidas de seguridad para proteger tus datos personales
            y transacciones. Sin embargo, no garantizamos la seguridad absoluta y no seremos responsables por la pérdida
            de datos o fondos debido a vulnerabilidades de seguridad.
          </Text>

          <Text style={styles.sectionTitle}>6. Tarifas y Cargos</Text>
          <Text style={styles.paragraph}>
            El uso de MobiPago puede estar sujeto a tarifas por ciertas transacciones, como transferencias
            internacionales, pagos a comerciantes o cargos por inactividad de la cuenta. Estas tarifas serán notificadas
            y debes aceptarlas antes de completar la transacción.
          </Text>

          <Text style={styles.sectionTitle}>7. Uso Aceptable</Text>
          <Text style={styles.paragraph}>
            Te comprometes a utilizar MobiPago de acuerdo con todas las leyes y regulaciones aplicables. Está prohibido
            usar nuestros servicios para realizar actividades ilegales, fraudulentas, o que violen los derechos de otros
            usuarios. Nos reservamos el derecho de suspender o cerrar tu cuenta en caso de comportamiento inapropiado.
          </Text>

          <Text style={styles.sectionTitle}>8. Responsabilidad del Usuario</Text>
          <Text style={styles.paragraph}>
            Eres responsable de las transacciones realizadas a través de tu cuenta de MobiPago. Cualquier error o
            disputa sobre una transacción debe ser notificado a nuestro servicio de atención al cliente dentro de los
            plazos establecidos. No seremos responsables de transacciones incorrectas o no autorizadas que ocurran
            debido a negligencia de tu parte.
          </Text>

          <Text style={styles.sectionTitle}>9. Privacidad y Protección de Datos</Text>
          <Text style={styles.paragraph}>
            Tu privacidad es importante para nosotros. La información personal que compartes con MobiPago será utilizada
            conforme a nuestra Política de Privacidad, que puedes consultar en cualquier momento en la aplicación.
          </Text>

          <Text style={styles.sectionTitle}>10. Modificaciones de los Términos y Condiciones</Text>
          <Text style={styles.paragraph}>
            MobiPago se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier
            cambio será notificado a través de la aplicación o por correo electrónico. El uso continuado de nuestros
            servicios después de cualquier cambio en los Términos y Condiciones implica que aceptas las nuevas
            condiciones.
          </Text>

          <Text style={styles.sectionTitle}>11. Terminación del Servicio</Text>
          <Text style={styles.paragraph}>
            Podemos suspender o finalizar tu cuenta en cualquier momento, con o sin previo aviso, si creemos que has
            violado estos Términos y Condiciones o si necesitamos realizar mantenimiento en nuestra plataforma.
          </Text>

          <Text style={styles.sectionTitle}>12. Ley Aplicable y Jurisdicción</Text>
          <Text style={styles.paragraph}>
            Estos Términos y Condiciones se rigen por las leyes de Perú y cualquier disputa relacionada con estos
            Términos será resuelta en los tribunales competentes de Lima.
          </Text>

          <Text style={styles.sectionTitle}>13. Contacto</Text>
          <Text style={styles.paragraph}>
            Si tienes alguna pregunta o inquietud sobre estos Términos y Condiciones, no dudes en contactarnos a través
            de movipago@movipago.com.
          </Text>

          <Text style={styles.footer}>¡Gracias por elegir MobiPago!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    fontSize: 20,
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
  textContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#257beb",
    marginTop: 25,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
    marginBottom: 15,
    textAlign: "justify",
  },
  footer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#257beb",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
})
