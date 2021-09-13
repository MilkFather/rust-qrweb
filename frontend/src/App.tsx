import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Container, Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'; 
import { debouncify } from 'utils-decorators';

import QueryPanel from './component/querypanel';
import ResultCard from './component/resultcard';

import { ResultJSON, QueryJSON, ResultJSONResult } from './interface';

export default function App() {
	const [text, setText] = useState<string>('');
	const [encode, setEncode] = useState<string>('auto');
	const [ec, setEC] = useState<string>('M');
	const [ver, setVer] = useState<string>('auto');

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);
	const handleEncodeChange = (event: React.ChangeEvent<{value: string}>) => setEncode(event.target.value);
	const handleECChange = (event: React.ChangeEvent<{value: string}>) => setEC(event.target.value);
	const handleVerChange = (event: React.ChangeEvent<{value: string}>) => setVer(event.target.value);

	const [json, setJson] = useState<ResultJSON | undefined>();
	const [err, setErr] = useState<string | undefined>('Not initialized');
	const [query, setQuery] = useState<string>('');

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdateQRmat = useCallback(
		debouncify((text: string, encode: string, ec: string, version: string) => {
			let queryjson: QueryJSON = {
				text: text,
				encode: encode,
				ec: ec,
				version: version
			};

			fetch('/api/qr/req', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(queryjson)
			}).then(resp => resp.json())
			.then((data: ResultJSON) => {
				setJson(data);
				setErr(undefined);
				setQuery(queryjson.text);
			})
			.catch(e => {
				setJson(undefined);
				setErr(e.toString());
				setQuery(queryjson.text);
			})
		}, 350),
		[]
	)

	useEffect(() => { debouncedUpdateQRmat(text, encode, ec, ver) }, [debouncedUpdateQRmat, text, encode, ec, ver]);

	const silzone: number = 4;
	const bitw: number = 10;
	const dilate: number = 0.2;

	const handleSaveClick = (event: any) => {
		if (json !== undefined) {
			let element = document.createElement('a');
			let svgText = 
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-silzone*bitw} ${-silzone*bitw} ${((json.result as ResultJSONResult).matrix[0].length+2*silzone)*bitw} ${((json.result as ResultJSONResult).matrix.length+2*silzone)*bitw}"><defs><style>.p{fill:#000000;}.n{fill:#ffffff;}</style></defs><rect x="${-silzone*bitw}" y="${-silzone*bitw}" width="${((json.result as ResultJSONResult).matrix[0].length+2*silzone)*bitw}" height="${((json.result as ResultJSONResult).matrix.length+2*silzone)*bitw}" class="n"/>${(json.result as ResultJSONResult).matrix.map((row, py) => {
					return row.map((cell, px) => {
						return (cell === 1) ? 
							`<rect x="${px*bitw-dilate}" y="${py*bitw-dilate}" width="${bitw+2*dilate}" height="${bitw+2*dilate}" class="p"/>`
							: ``
					}).reduce((previousValue: string, currentValue: string) => previousValue+currentValue)
				}).reduce((previousValue: string, currentValue: string) => previousValue+currentValue)}</svg>`
			element.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(svgText));
			element.setAttribute('download', `${query}.svg`);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}
	}

	return (
		<Container maxWidth="md">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h1>QR web</h1>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<QueryPanel
								textChange={handleTextChange}
								encChange={handleEncodeChange}
								ecChange={handleECChange}
								verChange={handleVerChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth disabled={json===undefined || !(json.success)} size="large" startIcon={<SaveIcon/>} variant="contained" color="primary" onClick={handleSaveClick}>Download</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={6}>
					<ResultCard
						json={json}
						err={err}
						query={query}
						silzone={silzone}
						bitw={bitw}
						dilate={dilate}
					/>
				</Grid>
			</Grid>
		</Container>
	);
}
