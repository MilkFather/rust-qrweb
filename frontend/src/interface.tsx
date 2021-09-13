export interface QRQueryParam {
	text: string,
	encode: string,
	ec: string,
	ver: string,
}

export interface QRQueryParamChangeHandler {
	textChange: any,
	encChange: any,
	ecChange: any,
	verChange: any,
}

export type AppDataModel = QRQueryParam;

export type QueryJSON = {
	text: string,
	encode: string,
	ec: string,
	version: string,
}

type Matrix = [[number]];

export type MatrixObj = { matrix: Matrix };

export type ResultJSONResult = {
	encode_mode: string,
	error_correction_level: string,
	version: string,
} & MatrixObj;

export type ResultJSON = {
	code: number,
	success: boolean,
	result: string | ResultJSONResult,
}

export type SizingProps = {
	silzone: number,// = 4;
	bitw: number,// = 10;
	dilate: number,// = 0.2;
}

export type DrawBoardProps = MatrixObj & SizingProps

export type ResultCardModel = {
	json: ResultJSON | undefined,
	err: string | undefined,
	query: string,
} & SizingProps;