use actix_files::NamedFile;
use actix_web::{get, HttpResponse, Responder};
use actix_web::http::StatusCode;
use serde_json::json;

use crate::api_handle;

#[get("/")]
pub async fn index(_req_body: String) -> Result<NamedFile, actix_web::error::Error> {
	Ok(NamedFile::open("./frontend/build/index.html")?)
}

pub async fn handle_qr_req(req_body: String) -> impl Responder {
	#[cfg(debug_assertions)]
    {
        println!("Incoming request: {}", req_body);
    }
	if let Ok(request) = api_handle::qr_new::parse_json(&req_body) {
		if let Some(validated_req) = api_handle::qr_new::validate_request(&request) {
			let response = api_handle::qr_new::get_qr(&validated_req);
			match response {
				Err(msg) => HttpResponse::build(StatusCode::BAD_REQUEST)
					.content_type("application/json")
					.body(json!({
						"code": 400,
						"success": false,
						"result": msg
					})),
				Ok(mat) => HttpResponse::build(StatusCode::OK)
					.content_type("application/json")
					.body(json!({
						"code": 200,
						"success": true,
						"result": mat
					}))
			}
		} else {
			HttpResponse::build(StatusCode::BAD_REQUEST)
				.content_type("application/json")
				.body(json!({
					"code": 400,
					"success": false,
					"result": "Request is invalid"
				}))
		}
	} else {
		HttpResponse::build(StatusCode::BAD_REQUEST)
			.content_type("application/json")
			.body(json!({
				"code": 400,
				"success": false,
				"result": "Request is not in valid format"
			}))
	}
}