/* ⚠️ This test is very much incomplete. */
/* ⚠️ Also it is currently failing! */
import { h, renderToString, Color } from 'ink';
import importJsx from 'import-jsx';
import test from 'ava';

const Ui = importJsx('./ui');

test('output', t => {
	const actual = renderToString(<Ui />);
	const expected = renderToString(
		<div>
			<div>
				<Color magenta>
					No whoa.json file found, defaulting to current directory
				</Color>
			</div>
			<div>
				<Color yellow>output directory: {__dirname}</Color>
			</div>
			<div />
			<div>
				<Color blue>title: </Color>
			</div>
		</div>
	);

	t.is(actual, expected);
});
