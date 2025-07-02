import { View, Text, Image, StyleSheet } from "react-native"

export default function Avatar({
  fotoPerfil,
  nombre,
  apellidos,
  size = 60,
  fontSize = 18,
  backgroundColor = "#93d2fd",
  textColor = "#257beb",
  borderColor = "#ffffff",
  borderWidth = 0,
  style,
}) {
  // Función para obtener las iniciales del nombre completo
  const getInitials = (nombre, apellidos) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ""
    const lastInitial = apellidos ? apellidos.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    borderWidth,
    borderColor,
    justifyContent: "center",
    alignItems: "center",
  }

  if (fotoPerfil) {
    return <Image source={{ uri: fotoPerfil }} style={[avatarStyle, style]} resizeMode="cover" />
  }

  return (
    <View style={[avatarStyle, style]}>
      <Text style={[styles.avatarText, { fontSize, color: textColor }]}>{getInitials(nombre, apellidos)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarText: {
    fontWeight: "bold",
  },
})
