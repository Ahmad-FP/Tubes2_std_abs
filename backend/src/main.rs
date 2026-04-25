mod handlers;
mod models;
mod parser;
mod scraper;
mod traversal;

use actix_cors::Cors;
use actix_web::{App, HttpServer};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    println!("Server running at http://localhost:8080");

    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .service(handlers::search)
            .service(handlers::api_scrape)
            .service(handlers::api_traverse)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
