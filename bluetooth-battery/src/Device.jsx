import { css, styled } from "uebersicht";

const batteryDrainedColor = "rgba(255, 0, 0, 0.62);";
const batteryPercentageColor = "rgba(0, 128, 0, 0.89)";

const DeviceContainer = styled("div")`
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	min-width: 200px;
	width: 100%;
	padding: 10px 15px 20px 15px;
	padding-bottom: 20px;
	position: relative;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	color: #fff;
	fill: #fff;
	font-family: Helvetica;
`;

const Text = styled("span")`
	align-self: flex-start;
	font-size: 14px;
	margin-bottom: 5px;
	padding-right: 10px;
	display: flex;
	align-items: center;
`;

const BatteryPercentage = styled("span")`
	align-self: flex-end;
	font-size: 10px;
	position: absolute;
	right: 16px;
`;

const BatteryBar = styled("div")(({ battery }) => ({
	borderRadius: "12px",
	height: 4,
	position: "absolute",
	left: 14,
	bottom: 15,
	backgroundColor: battery ? batteryPercentageColor : batteryDrainedColor,
	width: `calc(${battery ?? 100}% - 30px)`,
}));

const BatteryBarContainer = styled("div")`
	position: absolute;
	min-width: 100%;
	max-width: 100%;
`;

function Type({ icon, type }) {
	if (icon) {
		return (
			<div
				dangerouslySetInnerHTML={{ __html: icon.icon }}
				style={{
					width: icon.width,
					height: "auto",
					paddingRight: 8,
				}}
			/>
		);
	} else if (type) {
		return `${type}: `;
	}
	return null;
}

export function Device({ bluetoothDevice }) {
	const { deviceName, batteryPercent, battery, type, icon } = bluetoothDevice;
	return (
		<DeviceContainer>
			<Text>
				<Type icon={icon} type={type} /> {deviceName}
			</Text>
			<BatteryPercentage>{battery}</BatteryPercentage>
			<BatteryBar />
			<BatteryBar battery={batteryPercent} />
		</DeviceContainer>
	);
}
