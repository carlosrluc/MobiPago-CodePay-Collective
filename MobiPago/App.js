import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native"


// Simple icon components since we can't use Lucide in React Native
const BellIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>🔔</Text>
  </View>
)

const SettingsIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>⚙️</Text>
  </View>
)

const SearchIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>🔍</Text>
  </View>
)

const ChartIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>📊</Text>
  </View>
)

const QRIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>📱</Text>
  </View>
)

const SendIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>➤</Text>
  </View>
)

const HomeIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>🏠</Text>
  </View>
)

const CardIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>💳</Text>
  </View>
)

const UserIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>👤</Text>
  </View>
)

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Status Bar */}
          <View style={styles.statusBar}>
            <Text style={styles.statusTime}>9:41</Text>
            <View style={styles.statusRight}>
              <View style={styles.signalBars}>
                <View style={[styles.bar, styles.barActive]} />
                <View style={[styles.bar, styles.barActive]} />
                <View style={[styles.bar, styles.barActive]} />
                <View style={[styles.bar, styles.barActive]} />
                <View style={[styles.bar, styles.barInactive]} />
              </View>
              <Text style={styles.wifiIcon}>📶</Text>
              <View style={styles.battery}>
                <View style={styles.batteryLevel} />
              </View>
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Image source={require("./assets/favicon.png")} style={styles.avatarImage} />
              </View>
              <View style={styles.greeting}>
                <Text style={styles.greetingText}>Bienvenido de vuelta,</Text>
                <Text style={styles.userName}>Carlos R. Lucar</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <BellIcon />
            </TouchableOpacity>
          </View>

          {/* Movements Section */}
          <View style={styles.movementsContainer}>
            <View style={styles.movementsHeader}>
              <Text style={styles.movementsTitle}>Movimientos</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>Ver Todo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionsList}>
              <View style={styles.transaction}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>Carlos R. Lucar</Text>
                  <Text style={styles.transactionDate}>12/05/2025 - 11:15 am</Text>
                </View>
                <Text style={styles.transactionAmount}>S/ 5.00</Text>
              </View>

              <View style={styles.transaction}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>Carlos R. Lucar</Text>
                  <Text style={styles.transactionDate}>12/05/2025 - 10:15 am</Text>
                </View>
                <Text style={styles.transactionAmountNegative}>- S/ 15.00</Text>
              </View>

              <View style={styles.transaction}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>*** *** 156</Text>
                  <Text style={styles.transactionDate}>12/05/2025 - 10:15 am</Text>
                </View>
                <Text style={styles.transactionAmount}>S/ 20.00</Text>
              </View>

              <View style={[styles.transaction, styles.lastTransaction]}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>Humberto A. Linarez</Text>
                  <Text style={styles.transactionDate}>12/05/2025 - 10:15 am</Text>
                </View>
                <Text style={styles.transactionAmount}>S/ 100.00</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <SettingsIcon />
              </View>
              <Text style={styles.actionButtonText}>Ajustes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <SearchIcon />
              </View>
              <Text style={styles.actionButtonText}>Transacciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <ChartIcon />
              </View>
              <Text style={styles.actionButtonText}>Estadísticas</Text>
            </TouchableOpacity>
          </View>

          {/* Balance */}
          <View style={styles.balanceContainer}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceText}>Saldo disponible S/.12.000</Text>
            </View>
          </View>

          {/* QR and Send Buttons */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <QRIcon />
              <Text style={styles.quickActionText}>Mostrar QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Enviar</Text>
              <SendIcon />
            </TouchableOpacity>
          </View>

          {/* Bottom spacing for navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem}>
            <HomeIcon />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <CardIcon />
            <Text style={styles.navText}>Mis tarjetas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <UserIcon />
            <Text style={styles.navText}>Mi Perfil</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  // Status Bar
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statusTime: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signalBars: {
    flexDirection: "row",
    gap: 2,
  },
  bar: {
    width: 4,
    height: 12,
    borderRadius: 2,
  },
  barActive: {
    backgroundColor: "white",
  },
  barInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  wifiIcon: {
    fontSize: 12,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 2,
    padding: 2,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  greeting: {
    gap: 4,
  },
  greetingText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
  },
  userName: {
    color: "#232533",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationButton: {
    width: 48,
    height: 48,
    backgroundColor: "#82c7ff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // Movements
  movementsContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: "#93d2fd",
    borderRadius: 24,
    padding: 24,
  },
  movementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  movementsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  seeAllButton: {
    color: "#0066ff",
    fontWeight: "600",
  },
  transactionsList: {
    gap: 16,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(35, 37, 51, 0.2)",
  },
  lastTransaction: {
    borderBottomWidth: 0,
  },
  transactionInfo: {
    gap: 4,
  },
  transactionName: {
    color: "#232533",
    fontWeight: "600",
  },
  transactionDate: {
    color: "rgba(35, 37, 51, 0.7)",
    fontSize: 12,
  },
  transactionAmount: {
    color: "#232533",
    fontWeight: "bold",
  },
  transactionAmountNegative: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
    gap: 8,
  },
  actionButtonIcon: {
    width: 64,
    height: 64,
    backgroundColor: "#82c7ff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#232533",
    fontSize: 12,
    fontWeight: "600",
  },
  // Balance
  balanceContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: "#0066ff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  balanceText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  // Quick Actions
  quickActions: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "#0066ff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  quickActionText: {
    color: "white",
    fontWeight: "600",
  },
  // Bottom spacing
  bottomSpacing: {
    height: 100,
  },
  // Bottom Navigation
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#82c7ff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navText: {
    color: "#232533",
    fontSize: 10,
    fontWeight: "600",
  },
  // Icons
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 20,
  },
})
