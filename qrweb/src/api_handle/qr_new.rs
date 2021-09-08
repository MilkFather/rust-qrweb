use serde::Deserialize;
use qr::prelude::*;

#[derive(Deserialize)]
pub struct QrRequestJSON {
	pub id: String,
	pub text: String,
	pub encode: String,
	pub ec: String,
	pub version: String
}

pub struct QrRequest {
	pub id: String,
	pub text: String,
	pub encode: Option<EncodeMode>,
	pub ec: ErrorCorrectionLevel,
	pub version: Option<u8>
}

pub fn parse_json(json: &String) -> serde_json::Result<QrRequestJSON> {
	let req: serde_json::Result<QrRequestJSON> = serde_json::from_str(json);
	req
}

pub fn validate_request(req: &QrRequestJSON) -> Option<QrRequest> {
	let transreq: QrRequest = QrRequest {
		id: req.id.clone(),
		text: req.text.clone(),
		encode: match req.encode.to_lowercase().as_str() {
			"numeric" => Some(EncodeMode::Numeric),
			"alphanumeric" => Some(EncodeMode::Alphanumeric),
			"byte" => Some(EncodeMode::Byte),
			"kanji" => Some(EncodeMode::Kanji),
			"auto" => None,
			_ => { return None; }
		},
		ec: match req.ec.to_uppercase().as_str() {
			"L" => ErrorCorrectionLevel::L,
			"M" => ErrorCorrectionLevel::M,
			"Q" => ErrorCorrectionLevel::Q,
			"H" => ErrorCorrectionLevel::H,
			_ => { return None; }
		},
		version: if req.version == "auto" {
			None 
		} else {
			let raw = u8::from_str_radix(&req.version, 10);
			if raw.is_err() { return None; }
			let raw = raw.unwrap();
			Some(raw)
		}
	};
	Some(transreq)
}

pub fn get_qr(req: &QrRequest) -> Result<QrMatrix, &'static str> {
	make_qr(&req.text, req.encode, req.ec, req.version)
}