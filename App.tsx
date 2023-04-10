import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

let ms = 0
let ss = 0
let mm = 0

export default function App() {
	const [time, setTime] = useState("00:00:00")
	const [isPaused, setIsPaused] = useState(true)
	const [lastTime, setLastTime] = useState<String | null>(null)

	const timer = useRef<NodeJS.Timeout>()

	function handlePlayPause() {
		if (isPaused) {
			console.log("Iniciando cronômetro")
			timer.current = setInterval(() => {
				ms++
				if (ms === 100) {
					ms = 0
					ss++
				}
				if (ss === 60) {
					ss = 0
					mm++
				}
				setTime(
					`${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}:${
						ms < 10 ? "0" + ms : ms
					}`
				)
			}, 100)
		} else {
			clearInterval(timer.current)
			console.log("Pausando cronômetro")
		}
		setIsPaused(!isPaused)
	}

	function handleStop() {
		setIsPaused(true)
		clearInterval(timer.current)
		setLastTime(
			`${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}:${ms < 10 ? "0" + ms : ms}`
		)
		ms = 0
		ss = 0
		mm = 0
		setTime("00:00:00")
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />

			<View style={styles.crono}>
				<Text style={styles.time}>{time}</Text>
				<Image source={require("./assets/crono.png")} style={styles.image} />
			</View>

			<View style={styles.buttonWrapper}>
				<TouchableOpacity style={styles.button} onPress={handlePlayPause}>
					<Text>{isPaused ? "Iniciar" : "Pausar"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleStop}>
					<Text>Parar</Text>
				</TouchableOpacity>
			</View>

			<View>
				<Text style={{ color: "#fff", fontStyle: "italic" }}>
					{lastTime ? `Último tempo: ${lastTime}` : ""}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#232323",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	crono: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	time: {
		position: "absolute",
		fontSize: 50,
		color: "#fff",
		textAlign: "center",
		transform: [{ translateY: 30 }],
	},
	image: {
		width: 271,
		height: 330,
	},
	buttonWrapper: {
		flexDirection: "row",
	},
	button: {
		backgroundColor: "#fff",
		padding: 10,
		paddingHorizontal: 20,
		margin: 10,
		borderRadius: 10,
	},
})
