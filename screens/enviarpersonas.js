"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, TextInput } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { usePerfil } from "../context/PerfilContext"
import Navbar from "../components/navbar"

// Componente de contacto individual
const ContactItem = ({ perfil, onPress }) => {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={() => onPress(perfil)}>
      <Text style={styles.contactName}>
        {perfil.nombre} {perfil.apellidos}
      </Text>
      <Text style={styles.contactPhone}>{perfil.telefono}</Text>
    </TouchableOpacity>
  )
}

export default function EnviarPersonas({ navigation }) {
  const { todosLosPerfiles, perfil: perfilActual } = usePerfil()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const formatPhoneInput = (input) => {
    // Eliminar todo lo que no sea número
    let digits = input.replace(/\D/g, "").slice(0, 9);
    // Formatear como 888-888-888
    if (digits.length > 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        9
      )}`;
    } else if (digits.length > 3) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}${
        digits.length > 6 ? "-" : ""
      }${digits.slice(6, 9)}`;
    }
    return digits;
  };


  const handleSearch = (term) => {
    // Solo permitir números y formatear
    const formatted = formatPhoneInput(term);

    setSearchTerm(formatted);
    // Buscar solo si hay 9 dígitos
    const digits = formatted.replace(/\D/g, "");
    if (digits.length === 9) {
      const results = todosLosPerfiles.filter((perfil) => {
        if (perfil.id === perfilActual.id) return false;
        const telefonoLimpio = perfil.telefono.replace(/\D/g, "");
        return telefonoLimpio.includes(digits);
      });
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setShowSearchResults(false)
  }

  const handleSelectContact = (perfilSeleccionado) => {
    // Navegar a la pantalla de enviar pago con el ID del perfil seleccionado
    if (navigation) {
      navigation.navigate("EnviarPago", { destinatarioId: perfilSeleccionado.id })
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
        <Text style={styles.headerTitle}>Enviar a personas</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por teléfono"
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={handleSearch}
            keyboardType="phone-pad"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contactos Section */}
        <View style={styles.contactsSection}>
          <Text style={styles.contactsTitle}>Contactos</Text>
          <View style={styles.contactsContainer}>
            {showSearchResults && searchResults.length > 0 ? (
              searchResults.map((perfilEncontrado) => (
                <ContactItem key={perfilEncontrado.id} perfil={perfilEncontrado} onPress={handleSelectContact} />
              ))
            ) : showSearchResults && searchResults.length === 0 ? (
              <View style={styles.noResults}>
                <Ionicons name="person-outline" size={48} color="#999" />
                <Text style={styles.noResultsTitle}>No se encontraron contactos</Text>
                <Text style={styles.noResultsText}>Intenta con otro número de teléfono</Text>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={64} color="#ccc" />
                <Text style={styles.emptyStateTitle}>Busca contactos por teléfono</Text>
                <Text style={styles.emptyStateText}>
                  Ingresa al menos 3 dígitos del número de teléfono para buscar contactos
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Home" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257beb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, // Espacio para el navbar
  },
  contactsSection: {
    paddingHorizontal: 20,
  },
  contactsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  contactsContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  contactItem: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  contactPhone: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
})
