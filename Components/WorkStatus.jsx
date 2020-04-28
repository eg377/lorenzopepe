import { Fragment } from "react";

export const WorkStatus = ({ searching }) => {
	return (
		<div className={`work-status ${searching ? "searching" : "employed"}`}>
			{searching ? <Searching /> : <Employed />}
		</div>
	);
};

const Searching = () => (
	<Fragment>
		<p>I am currently looking for a job, feel free to reach out!</p>
		<p className="email">
			<strong>
				<a href="mailto:info@lorenzopepe.dev">info@lorenzopepe.dev</a>
			</strong>
		</p>
	</Fragment>
);

const Employed = () => (
	<Fragment>
		<p>I am currently emplyed at DREAM_COMPANY</p>
		<p>And I'm not looking for a job!</p>
	</Fragment>
);
