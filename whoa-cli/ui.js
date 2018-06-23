'use strict';

const findUp = require('find-up');
const { h, Component, Color, Fragment } = require('ink');
const PropTypes = require('prop-types');
const TextInput = require('ink-text-input');
const fs = require('fs');
const path = require('path');

class UI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foundWhoaConfig: false,
			outputDirectory: __dirname,
			phase: 'title',
			title: '',
			path: '',
			hashtags: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.nextInput = this.nextInput.bind(this);
		this.writeFile = this.writeFile.bind(this);
	}

	async componentDidMount() {
		const whoaConfig = await findUp('whoa.json');
		if (whoaConfig) {
			const { outputDirectory } = JSON.parse(fs.readFileSync(whoaConfig));
			this.setState({
				foundWhoaConfig: true,
				outputDirectory: path.resolve(
					path.dirname(whoaConfig),
					outputDirectory
				),
			});
		}
	}

	handleChange(key, val) {
		this.setState({ [key]: val });
	}

	nextInput() {
		let nextPhase = '';
		switch (this.state.phase) {
			case 'title':
				nextPhase = 'path';
				break;
			case 'path':
				nextPhase = 'hashtags';
				break;
			case 'hashtags':
				nextPhase = 'result';
				this.writeFile();
				break;
			default:
				return;
		}
		this.setState({ phase: nextPhase });
	}

	writeFile() {
		const folderPath = path.resolve(
			this.state.outputDirectory,
			`${new Date().toISOString().split('T')[0]}-${this.state.path}`
		);
		let result = '';
		try {
			fs.mkdirSync(folderPath);
			fs.writeFileSync(
				path.resolve(folderPath, 'index.whoa'),
				`---
title: ${this.state.title}
path: ${this.state.path}
hashtags: [${this.state.hashtags.split(/(\s)|(,\s?)/)}]
date: ${new Date().toISOString()}
---`
			);
			result = 'Success! 🤑';
		} catch (e) {
			result = `Error: ${e}`;
		}
		this.setState({ result }, setTimeout(() => process.exit(), 250));
	}

	render({ name }) {
		return (
			<Fragment>
				<div>
					<div>
						{this.state.foundWhoaConfig ? (
							<Color green>Found whoa config!</Color>
						) : (
							<Color magenta>
								No whoa.json file found, defaulting to current directory
							</Color>
						)}
					</div>
					<div>
						<Color yellow>output directory: {this.state.outputDirectory}</Color>
					</div>
				</div>
				<div>
					{(this.state.phase === 'path' ||
						this.state.phase === 'hashtags' ||
						this.state.phase === 'result') && (
						<div>title: {this.state.title}</div>
					)}

					{(this.state.phase === 'hashtags' ||
						this.state.phase === 'result') && (
						<div>path: {this.state.path}</div>
					)}

					{this.state.phase === 'result' && (
						<div>hashtags: {this.state.hashtags}</div>
					)}

					{this.state.phase !== 'result' ? (
						<div>
							<Color blue bold>
								{this.state.phase}:{' '}
							</Color>
							<TextInput
								value={this.state[this.state.phase]}
								placeholder={
									this.state.phase === 'hashtags'
										? 'seperate values with a space or comma'
										: this.state.phase === 'path'
											? 'a URL-safe string please'
											: null
								}
								onChange={v => this.handleChange(this.state.phase, v)}
								onSubmit={this.nextInput}
							/>
						</div>
					) : (
						<div>
							<div />
							<div>
								<Color
									{...{
										[this.state.result.includes('uccess')
											? 'green'
											: 'red']: true,
									}}
								>
									{this.state.result}
								</Color>
							</div>
						</div>
					)}
				</div>
			</Fragment>
		);
	}
}

UI.propTypes = {
	name: PropTypes.string,
};

UI.defaultProps = {
	name: 'Ink',
};

module.exports = UI;
