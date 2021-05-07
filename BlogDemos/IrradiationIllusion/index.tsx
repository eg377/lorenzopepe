import style from "./index.module.scss";

export const IrradiationIllusion: React.FC = () => {
	return (
		<div className={style.irradiation_illusion}>
			<code className="inline-code">font-weight: 300</code>
			<div
				className={style.example_container}
				style={{ fontWeight: 300 }}
			>
				<div className={style.light}>The quick brown fox jumps</div>
				<div className={style.dark}>The quick brown fox jumps</div>
			</div>
			<code className="inline-code">font-weight 400</code>
			<div
				className={style.example_container}
				style={{ fontWeight: 400 }}
			>
				<div className={style.light}>The quick brown fox jumps</div>
				<div className={style.dark}>The quick brown fox jumps</div>
			</div>
		</div>
	);
};
