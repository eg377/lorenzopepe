export const IrradiationIllusion: React.FC = () => {
	return (
		<div className="irradiation-illusion">
			<code className="inline-code">font-weight: 300</code>
			<div className="example-container" style={{ fontWeight: 300 }}>
				<div className="light">The quick brown fox jumps</div>
				<div className="dark">The quick brown fox jumps</div>
			</div>
			<code className="inline-code">font-weight 400</code>
			<div className="example-container" style={{ fontWeight: 400 }}>
				<div className="light">The quick brown fox jumps</div>
				<div className="dark">The quick brown fox jumps</div>
			</div>
		</div>
	);
};
