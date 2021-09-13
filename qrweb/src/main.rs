mod routes;
mod api_handle;

use actix_web::{App, HttpServer, guard, web};
use actix_files as fs;

const ADDR: &str = "127.0.0.1:8080";

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    #[cfg(debug_assertions)]
    {
        println!("Deployed at address: {}", ADDR);
        println!("Routed: /static/* -> {}", concat!(env!("CARGO_MANIFEST_DIR"), "/static/*"));
    }
    HttpServer::new(|| {
        App::new()
            .service(routes::index)
            .service(
                web::resource("/api/qr/req")
                    .guard(guard::Header("content-type", "application/json"))
                    .route(web::post().to(routes::handle_qr_req)),
            )
            .service(fs::Files::new("/", concat!(env!("CARGO_MANIFEST_DIR"), "/static")).index_file("/static/index.html"))
    })
    .bind(ADDR)?
    .run()
    .await
}
